import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import moment from 'moment'
import { Ecommerce, Services } from 'store/actions'
import { authStore } from 'service'
import { translate } from 'utils'
import Components, { InputGroup, Input, Label } from 'components'
import { Service } from './style/ServiceStyle'
import Loading from 'components/Loading'

const Confirmation = ({ service_data, type }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { paymentList_data } = useSelector(state => state.ecommerce)
  let ticket = true

  // get payment list 
  useEffect(() => {
    dispatch(Ecommerce.getPaymentList(authStore?.getAuth()?.uid || '', ticket))
  }, [dispatch, langStore?.code, ticket])

  const divisionData = service_data?.location?.data?.filter(data => data?.id === +service_data?.data?.values?.division)
  const townshipData = divisionData?.[0]?.township?.filter(data => data?.id === +service_data?.data?.values?.township)

  // const locationData = groupBy(service_data?.location?.data, 'id')

  // get division name from data 
  // let getDivision = data?.data[0]?.division_id
  // let division_name = getDivision !== undefined && getDivision !== null && Object.values(getDivision)[1]

  // // get township name from data 
  // let getTownship = data?.data[0]?.township_id
  // let township_name = getTownship !== undefined && getTownship !== null && Object.values(getTownship)[1]

  let initialValues = {
  }

  const serviceTypeArr = []
  service_data?.data?.values?.service_type?.map(type => serviceTypeArr?.push(+type))

  const onDataSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      try {
        const postData = {
          customer_name: service_data?.data?.values?.name,
          email: service_data?.data?.values?.email,
          mobile: service_data?.data?.values?.phone,
          address_to_come: service_data?.data?.values?.address,
          message: service_data?.data?.values?.customer_message,
          division_id: +service_data?.data?.values?.division,
          township_id: +service_data?.data?.values?.township,
          service_type_id: serviceTypeArr,
          attachment_ids: service_data?.data?.values?.file_type?.map(type => type?.split(',')?.[1])
        }

        var res
        if (type === 'express') {
          res = await dispatch(Services.sentExpressService(postData))
        } else {
          res = await dispatch(Services.sentHomeService(postData))
        }

        if (res?.result?.status === 'success') {
          alert('success')
        }

        actions.setSubmitting(false)
        setDisabled(false)

      } catch (error) {
        console.log('error', error)
      }


      // let paymentPostData = {
      //   order_id: data?.data[0]?.id,
      //   acquirer_id: paymentList_data?.selected_id,
      //   user_id: authStore?.getAuth()?.uid || ''
      // }

      // if (!authStore?.getAuth()) {
      //   delete paymentPostData.user_id
      // }

      // let payment_method_code = paymentList_data?.data?.filter(x => x.payment_method_id === paymentList_data?.selected_id)[0]?.payment_method_code

      // let res = await dispatch(Ecommerce.payNow(paymentPostData))
      // if (res?.result?.status.toLowerCase() === 'success') {
      //   if (payment_method_code === '2C2P') {
      //     delete paymentPostData.user_id
      //     delete paymentPostData.acquirer_id
      //     let otherPayment_res = await dispatch(Ecommerce.payNow(paymentPostData, 'other_pay'))
      //     if (otherPayment_res?.result?.respCode === '0000') {
      //       window.location.assign(otherPayment_res?.result?.webPaymentUrl)
      //     }
      //   } else {
      //     if (type !== "express") {
      //       history.replace({
      //         pathname: `/home-service/home-order-success`
      //       })
      //     } else {
      //       history.replace({
      //         pathname: `/express-service/express-order-success`
      //       })
      //     }
      //   }
      //   actions.setSubmitting(false)
      //   setDisabled(false)
      // } else {
      //   console.log('Something went wrong!')
      // }
      window.scrollTo(0, 0)
    }, 1000)
  }

  const handleUserCheck = e => {
    dispatch(Ecommerce.getPaymentChange('payment_method_id', paymentList_data?.data, e?.payment_method_id))
  }

  const handleGoBack = () => {
    history.push({
      pathname: type === 'express' ? '/express-service' : '/home-service',
      service: service_data,
      type: type
    })
  }

  return (
    <Components.Section>
      <Components.Container>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => onDataSubmit(values, actions)}>
          {
            formikProps => (
              <Form>
                <Components.Row>
                  <Components.Col md="12">
                    <Service>
                      <Components.View as="div" className="confirm-content">
                        <Components.Text as="h5">
                          {type === 'express' && translate(translation_data, 'confirm_express', langStore?.code)}
                          {type === 'homeservice' && translate(translation_data, 'confirm_home', langStore?.code)}
                        </Components.Text>
                        <div className="content-wrap">
                          <div className="content-item">
                            <label>{translate(translation_data, 'customer_name', langStore?.code)}</label>
                            <span className='value'>{service_data?.data?.values?.name}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'email', langStore?.code)}</label>
                            <span className='value'>{service_data?.data?.values?.email}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'phone', langStore?.code)}</label>
                            <span className='value'>{service_data?.data?.values?.phone}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'address_to_come', langStore?.code)}</label>
                            <span className='value'>{service_data?.data?.values?.address}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'state_division', langStore?.code)}</label>
                            <span className='value'>{divisionData?.[0]?.name}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'township', langStore?.code)}</label>
                            <span className='value'>{townshipData?.[0]?.name}</span>
                          </div>
                          <div className="content-item">
                            <label>{translate(translation_data, 'service_type', langStore?.code)}</label>
                            <span className="value">
                              {service_data?.service_type?.selectType?.length > 0 &&
                                service_data?.service_type?.selectType?.map((service, key, arr) => (
                                  <span key={key}>{service}{key !== arr?.length - 1 ? ', ' : ''}</span>
                                ))
                              }
                            </span>
                          </div>
                          {type === 'homeservice' &&
                            <>
                              <div className="content-item">
                                <label>{translate(translation_data, 'appointment_date_time', langStore?.code)}</label>
                                <span>{moment(service_data?.data?.values?.date).format("D/M/YYYY")}</span>
                              </div>
                              <div className="content-item">
                                <label>{translate(translation_data, 'subject', langStore?.code)}</label>
                                <span>{service_data?.data?.values?.subject}</span>
                              </div>
                            </>
                          }
                          <div className="content-item">
                            <label>{translate(translation_data, 'customer_msg', langStore?.code)}</label>
                            <span>{service_data?.data?.values?.customer_message}</span>
                          </div>
                          <Components.Text weight="lg" color="secondary" style={{ paddingTop: 10 }}>
                            {`* 
                            ${translate(translation_data, 'service_form_transfer_1', langStore?.code)} 
                            (${service_data?.service_deposit ? service_data?.service_deposit : ' '}) 
                            ${translate(translation_data, 'service_form_transfer_2', langStore?.code)}`}
                          </Components.Text>
                          <div className="payment paywith">
                            <Components.Text weight='lg' className="title">{translate(translation_data, 'paywith', langStore?.code)}</Components.Text>
                            <div className='item-wrap'>
                              {
                                paymentList_data?.data?.length > 0 &&
                                paymentList_data?.data?.filter(y => y?.payment_method_code === '2C2P').map((x, i) => (
                                  <InputGroup className="custom-radio" key={i} onClick={() => handleUserCheck(x)}>
                                    <Input
                                      value={x?.payment_method_id}
                                      type="radio"
                                      name="payment"
                                      id={x?.payment_method_id}
                                      defaultChecked={x?.payment_method_code === '2C2P'}
                                    />
                                    <Label htmlFor={x?.payment_method_id}>{x?.payment_method_name}</Label>
                                    {
                                      x?.payment_icons?.length > 0 &&
                                      <div className='icon-container'>
                                        {
                                          x?.payment_icons?.map((y, index) => (
                                            <div key={index} className='icon-wrap'>
                                              <img src={y?.url ? y?.url : require('../../assets/img/no-img.jpg').default} alt='' />
                                            </div>
                                          ))
                                        }
                                      </div>
                                    }
                                  </InputGroup>
                                ))
                              }
                            </div>
                          </div>
                          <div className="submit-wrap">
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
                            <Components.Button
                              className="btn btn-gray"
                              type="button"
                              onClick={() => handleGoBack()}
                            >
                              {translate(translation_data, 'back', langStore?.code)}
                            </Components.Button>
                          </div>

                        </div>

                      </Components.View>
                    </Service>

                  </Components.Col>
                </Components.Row>
              </Form>
            )
          }
        </Formik>
      </Components.Container>
    </Components.Section>
  )
}

export default Confirmation
