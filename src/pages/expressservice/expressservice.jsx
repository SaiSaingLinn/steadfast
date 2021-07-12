import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { HomeContent, Services } from 'store/actions'
import { fileToBase64, translate, moneyFormat } from 'utils'
import Components from 'components'
import Loading from 'components/Loading'
import { adsKey } from 'key'
import { Service } from 'components/service/style/ServiceStyle'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
// import Select from 'react-select'

const { center_ads, express_service_ads, express_service } = adsKey

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ExpressServiceForm = () => {
  const history = useHistory()
  const location = useLocation()
  const fileRef = useRef([])
  const [disabled, setDisabled] = useState(false)
  const [selectType, setSelectType] = useState([])
  const [fileName, setFileName] = useState([])
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { homeContent_data } = useSelector(state => state.homecontent)
  const { isProfileData } = useSelector(state => state.emit)
  const { expressType_data, serviceLocation_data, serviceSetting_data } = useSelector(state => state.services)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Services.getServiceLocation({ lang: langStore?.code }))
    dispatch(Services.getExpressServiceType({ lang: langStore?.code }))
    dispatch(Services.getServiceSetting({ lang: langStore?.code }))
    dispatch(HomeContent.getHomeContent({ lang: langStore?.code })) // get home content
  }, [dispatch, langStore?.code])

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, translate(translation_data, 'must_be_20_character', langStore?.code))
      .required(translate(translation_data, 'name_is_required', langStore?.code)),
    phone: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, translate(translation_data, 'too_much digits', langStore?.code))
      .matches(phoneRegExp, translate(translation_data, 'phone_not_valid', langStore?.code))
      .required(translate(translation_data, 'phone_is_required', langStore?.code)),
    email: Yup.string()
      .email(translate(translation_data, 'invalid_email', langStore?.code)),
    address: Yup.string()
      .required(translate(translation_data, 'address_is_required', langStore?.code)),
    division: Yup.string()
      .required(translate(translation_data, 'division_is_required', langStore?.code)),
    township: Yup.string()
      .required(translate(translation_data, 'township_is_required', langStore?.code)),
    service_type: Yup.array()
      .min(1, translate(translation_data, 'select_service_type', langStore?.code))
      .required(translate(translation_data, 'select_service_type', langStore?.code)),
    file_type: Yup.array(),
    customer_message: Yup.string()
      .required(translate(translation_data, 'message_is_required', langStore?.code)),
    check: Yup.boolean()
      .test(
        'is-true',
        translate(translation_data, 'must_agree_policy', langStore?.code),
        value => value === true
      )
  })

  const onDataSubmit = (values, actions) => {
    setDisabled(true)

    setTimeout(async () => {
      try {
        history.push({
          pathname: `/express-service/confirm`,
          service: { values },
          type: 'express',
          service_type: { selectType },
          service_deposit: `${moneyFormat(serviceSetting_data?.data?.[0]?.express_deposit_payment)} Ks`
        })
        actions.setSubmitting(false)
        setDisabled(false)
      } catch (error) {
        console.log('error', error)
      }
    }, 1000)
  }

  const handleRemoveFile = (val, key) => {
    let tmp1 = fileName
    let tmp2 = val?.values?.file_type
    tmp1.splice(key, 1)
    tmp2.splice(key, 1)

    setFileName([...tmp1])
    val?.setFieldValue([...tmp2])
  }

  const breadcrumb_data = [
    {
      name: translate(translation_data, 'express_service', langStore?.code)
    }
  ]

  const link_condition = <span htmlFor="check" style={{ paddingTop: 3, overflow: 'visible', textTransform: 'none' }}>I agree with apogee's <Link to='/termsandconditions' target="_blank" style={{ color: '#FF0000', textDecoration: 'none' }}>terms and conditions.</Link> and <Link to='/privacypolicy' target="_blank" style={{ color: '#FF0000', textDecoration: 'none' }}>Policies.</Link><span style={{ color: "#FF0000" }}>*</span></span>

  return (
    <>
      <Components.PageBanner page_code={express_service} />

      <Components.Breadcrumb data={breadcrumb_data} />

      <Components.Advertisement position_code={center_ads} page_code={express_service_ads} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.Col space="12">
              <Service>
                <Components.View as="div" className="service">
                  <Components.Text as="h5">
                    {homeContent_data?.data?.card_3_title}
                  </Components.Text>
                  <Components.Text
                    dangerouslySetInnerHTML={{ __html: homeContent_data?.data?.card_3_description }}
                  />
                  <Formik
                    enableReinitialize
                    initialValues={
                      {
                        name: isProfileData?.name || location?.service?.data.values.name || '',
                        phone: isProfileData?.mobile || location?.service?.data.values.phone || '',
                        email: isProfileData?.email || location?.service?.data.values.email || '',
                        address: location?.service?.data.values.address || '',
                        division: '',
                        township: '',
                        service_type: [],
                        file_type: [],
                        customer_message: location?.service?.data.values.customer_message || '',
                        check: false
                      }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                    {
                      formikProps => (
                        <Form>
                          <Components.Row>
                            <Components.Col md="6">
                              <Components.TextInput
                                label={translate(translation_data, 'customer_name', langStore?.code)}
                                name="name" type="text" require={true} />

                              <Components.TextInput
                                label={translate(translation_data, 'mobile_phone', langStore?.code)}
                                name="phone" type="text" require={true} isNumber={true}
                                onKeyDown={e => e.key !== "Backspace" &&
                                  e.key !== "Enter" &&
                                  e.keyCode !== 37 &&
                                  e.keyCode !== 39 &&
                                  e.keyCode !== 46 &&
                                  e.keyCode !== 9 &&
                                  e.key.match(/[^0-9]/)
                                  && e.preventDefault()
                                } />

                              <Components.TextInput
                                label={translate(translation_data, 'email', langStore?.code)}
                                name="email" type="email" />

                              <Components.TextArea
                                label={translate(translation_data, 'address', langStore?.code)}
                                name="address" type="text" rows_height='80' require={true} />

                              <Components.Select
                                label={translate(translation_data, 'state_division', langStore?.code)}
                                name="division"
                                require={true}
                                onChange={e => {
                                  formikProps.setFieldValue('division', e.target.value)
                                  let cityId_arr = serviceLocation_data?.data?.filter(city => city?.id === +e.target.value)

                                  formikProps.setFieldValue('township', cityId_arr?.length > 0 ? (
                                    cityId_arr[0]?.township?.length > 0 ?
                                      cityId_arr[0]?.township[0]?.id :
                                      '') :
                                    ''
                                  )
                                }}
                              >
                                <option value=''>{translate(translation_data, 'select_division', langStore?.code)}</option>
                                {serviceLocation_data?.data?.map(city => (
                                  <option value={city?.id} key={city?.id}>{city?.name}</option>
                                ))}
                              </Components.Select>

                              <Components.Select
                                label={translate(translation_data, 'township', langStore?.code)}
                                name="township" require={true}>
                                <option value=''>{translate(translation_data, 'select_township', langStore?.code)}</option>
                                {
                                  serviceLocation_data?.data?.filter(x => x?.id === +formikProps?.values?.division).map(township => {
                                    return township?.township?.map((y, index) => (
                                      <option value={y?.id} key={index}>{y.name}</option>
                                    ))
                                  })
                                }
                              </Components.Select>
                            </Components.Col>

                            <Components.Col md="6">
                              {/* <Select
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={expressType_data?.data}
                                isMulti
                                onChange={formikProps.handleChange}
                              /> */}

                              <Components.Select
                                label={translate(translation_data, 'service_type', langStore?.code)}
                                name="service_type"
                                require={true}
                                onChange={e => {
                                  formikProps.setFieldValue('service_type', [...formikProps?.values?.service_type, e.target.value])
                                  let serviceType = expressType_data?.data?.find(service => service?.id === +e.target.value)
                                  !selectType?.includes(serviceType?.name) &&
                                    setSelectType([
                                      ...selectType,
                                      serviceType?.name
                                    ])
                                }}
                              >
                                <option value='' disabled>{translate(translation_data, 'select_service_type', langStore?.code)}</option>
                                {
                                  expressType_data?.data?.map(service => (
                                    <option value={service?.id} key={service?.id}>{service?.name}</option>
                                  ))
                                }
                              </Components.Select>

                              {selectType?.length > 0 &&
                                <div className="service-type">
                                  {selectType?.map((type, key) => (
                                    <div className='input-wrap' key={key}>
                                      <ServiceType value={type} name="ticket" type="text" disabled />
                                      <IoCloseCircleSharp onClick={() => setSelectType(selectType.filter(item => item !== type))} />
                                    </div>
                                  ))}
                                </div>
                              }

                              <Components.TextArea
                                label={translate(translation_data, 'customer_msg', langStore?.code)}
                                name="customer_message" type="text" rows_height='80' require={true} />

                              <div className="upload-file">
                                <input id='file' name='file_type' type='file' accept=".jpeg,.png,.gif,.tiff,.psd,.eps,.ai,.indd,.pdf,.svg,.raw"
                                  onChange={e => {
                                    e.target?.files[0]?.name && setFileName([...fileName, e.target?.files[0]?.name])
                                    e.currentTarget.files[0] && fileToBase64(e.currentTarget.files[0]).then(data => {
                                      formikProps.setFieldValue('file_type', [...formikProps?.values?.file_type, data])
                                    })
                                    e.target.value = null
                                    return false
                                  }}
                                />
                                <div className='upload-attachment'>
                                  <AiOutlineCloudUpload />
                                  <span>{translate(translation_data, 'upload_attachment', langStore?.code)}</span>
                                </div>

                              </div>
                              <div className='attachment-file'>
                                {formikProps?.values?.file_type?.length > 0 &&
                                  formikProps?.values?.file_type?.map((value, key) => (
                                    <div key={key}>
                                      <AttachImg image={value} ref={fileRef} />
                                      <MdCancel onClick={() => handleRemoveFile(formikProps, key)} />
                                    </div>
                                  ))
                                }
                              </div>

                              <Components.CheckBox
                                label={link_condition}
                                type="checkbox"
                                name="check"
                              />
                            </Components.Col>

                            <Components.Col space="12">
                              <div className="submit-wrap">
                                <Components.Text weight="lg" color="secondary">
                                  {`* 
                                    ${translate(translation_data, 'service_form_transfer_1', langStore?.code)}
                                    (${moneyFormat(serviceSetting_data?.data?.[0]?.express_deposit_payment)} Ks)
                                    ${translate(translation_data, 'service_form_transfer_2', langStore?.code)}
                                  `}
                                </Components.Text>
                                <Components.Button type='submit' className={`btn btn-default upper ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                                  {
                                    formikProps.isSubmitting ?
                                      <Loading style={{
                                        width: 20,
                                        height: 20,
                                        border: '3px solid rgba(255, 255, 255, .23)',
                                        borderRight: '3px solid rgba(255, 255, 255, .85)',
                                      }}>{translate(translation_data, 'request_service', langStore?.code)}</Loading> :
                                      translate(translation_data, 'request_service', langStore?.code)
                                  }
                                </Components.Button>
                              </div>
                            </Components.Col>
                          </Components.Row>
                        </Form>
                      )
                    }
                  </Formik>
                </Components.View>
              </Service>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

export default ExpressServiceForm

const ServiceType = styled.input`
  width: 100%;
  height: 40px;
  padding: 7px 15px;
`

const AttachImg = styled.div`
  width: 95px;
  height: 60px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: url("${props => props?.image}") no-repeat center / cover;
`