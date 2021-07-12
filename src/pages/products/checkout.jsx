import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Components, { Container, Row, Col, Text, Button, Image, Tr, Td } from '../../components'
import { ShoppingCartSection } from './style/ProductStyle'
import { Location, Ecommerce } from 'store/actions'
import { authStore } from 'service'
import { translate, moneyFormat } from 'utils'
import Loading from 'components/Loading'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const CheckOut = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { profile_data } = useSelector(state => state.profile)
  const { cityList_data } = useSelector(state => state.location)
  const { ...para } = useParams()
  const { cart_data } = useSelector(state => state.ecommerce)
  const { meta_data } = useSelector(state => state.meta)
  let order_id = para?.id
  console.log(`meta_data`, meta_data)
  // get state and division id 
  useEffect(() => {
    dispatch(Location.getCityList(langStore?.code))
  }, [dispatch, langStore?.code])

  // get cart 
  useEffect(() => {
    order_id && dispatch(Ecommerce.getCart(order_id || '', authStore?.getAuth()?.uid || '', langStore?.code))
  }, [dispatch, langStore?.code, order_id])
  
  const headerData = [
    {
      title: translate(translation_data, 'product', langStore?.code)
    },
    {
      title: translate(translation_data, 'price', langStore?.code)
    },
    {
      title: translate(translation_data, 'quantity', langStore?.code)
    },
    {
      title: translate(translation_data, 'subtotal', langStore?.code)
    }
  ]

  const tableBody = () => (
    <>
      {
        cart_data?.data?.length > 0 &&
        cart_data?.data?.map((x, i) => (
          <Tr key={i}>
            <Td>
              <Text className="mobile-caption">{translate(translation_data, 'product', langStore?.code)}</Text>
              <div>
                {/* {
                  x?.product_type === 'service' && Math.sign(x?.price_unit) >= 0 ?
                  <Image src={require('../../assets/icons/shipped.svg').default} alt='' style={{width: 100}} />
                  :
                  x?.product_type === 'product' ?
                  <Image src={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} alt="product" style={{width: 100}} />
                  :
                  ''
                } */}
                {
                  x?.product_type === 'product' &&
                  <Image src={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} alt="product" style={{width: 100}} />
                }
                <Text>{x?.product}</Text>
              </div>
            </Td>
            <Td halign="center" className="price">
              <Text className="mobile-caption">{translate(translation_data, 'price', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_unit)} Ks</Text>
            </Td>
            <Td halign="center">
              <Text className="mobile-caption">{translate(translation_data, 'quantity', langStore?.code)}</Text>
              <Text>{x?.quantity}</Text>
            </Td>
            <Td halign="center" className="price">
              <Text className="mobile-caption">{translate(translation_data, 'subtotal', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_subtotal)} Ks</Text>
            </Td>
          </Tr>
        ))
      }
      <Tr className="total">
        <Td colSpan="3" halign="right">
          <Text className="total-title">{translate(translation_data, 'subtotal', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price">{moneyFormat(cart_data?.amount_untaxed)} Ks</Text>
        </Td>
      </Tr>
      <Tr className="total border">
        <Td colSpan="3" halign="right">
          <Text className="total-title">{translate(translation_data, 'tax', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price">{moneyFormat(cart_data?.taxes)} Ks</Text>
        </Td>
      </Tr>
      <Tr className="total">
        <Td colSpan="3" halign="right">
          <Text className="total-title title-bold">{translate(translation_data, 'total_amount', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price title-bold">{moneyFormat(cart_data?.amount_total)} Ks</Text>
        </Td>
      </Tr>
    </>
  )

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required("Name is required"),
    mobile: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, 'Your phone number is too much digits!')
      .matches(phoneRegExp, 'Your Phone number is not valid!')
      .required("Phone is required"),
    state_division: Yup.string()
      .required("State/Division is required"),
    township_id: Yup.string()
      .required("Township is required"),
    address1: Yup.string()
      .required("Address is required"),
  })

  let initialValues = { 
    name: profile_data?.data[0]?.name || '', 
    mobile: profile_data?.data[0]?.mobile|| '',
    address1: profile_data?.data[0]?.street || '', 
    state_division: profile_data?.data[0]?.state_division_id || '', 
    township_id: profile_data?.data[0]?.township_id || ''
  }

  const onDataSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      let { address1, state_division, name, mobile, township_id } = values
      let postData = {
        user_id: authStore?.getAuth()?.uid || '',
        name: name,
        mobile: mobile,
        address1: address1,
        state_division: +state_division,
        township_id: +township_id,
        order_id: +order_id,
      }
      // console.log('postData', postData)
      
      let res = await dispatch(Ecommerce.createShipping(postData))
      // console.log(res)
      if (res?.result?.status?.toLowerCase() === 'success') {
        history.replace({
          pathname: `/payment/${+order_id}`,
          state: { address1 }
        })
        window.scrollTo(0, 0)
        actions.setSubmitting(false)
        setDisabled(false)
      } else {
        console.log('Something went wrong!')
      }
    }, 1000)
  }

  // goto login 
  // const goToLogin = () => {
  //   history.replace({
  //     pathname: `/signin`,
  //     state: { order_id, type: "product" }
  //   })
  // }

  const breadcrumb_data = [{ name: translate(translation_data, 'checkout', langStore?.code) }]
  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <ShoppingCartSection>
        <Container>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => onDataSubmit(values, actions)}>
            {
              formikProps => (
                <Form>
                  <Row>
                    <Col lg="5">
                      <div className='shipping-form'>
                        <div className='shipping-title'>
                          <div>
                            <Text cu_size='18' weight='lg'>{translate(translation_data, 'delivery_address', langStore?.code)}</Text>
                          </div>
                          {/* {
                            !authStore?.getAuth()?.uid &&
                            <Button className='btn btn-gray' onClick={() => goToLogin()}>Login</Button>
                          } */}
                        </div>
                        <Components.TextInput label={translate(translation_data, 'name', langStore?.code)} name="name" type="text" require={true}/>
                        <Components.TextInput
                          label={translate(translation_data, 'phone', langStore?.code)} name="mobile" type="text" isNumber={true} require={true}
                          onKeyDown={e => e.key !== "Backspace" &&
                            e.key !== "Enter" &&
                            e.keyCode !== 37 &&
                            e.keyCode !== 39 &&
                            e.keyCode !== 46 &&
                            e.keyCode !== 9 &&
                            e.key.match(/[^0-9]/)
                            && e.preventDefault()
                          } 
                        />
                        <Components.Select
                          label={translate(translation_data, 'state_division', langStore?.code)}
                          name="state_division"
                          require={true}
                          onChange={e => {
                            formikProps.setFieldValue('state_division', e.target.value)
                            let cityId_arr = cityList_data?.data?.filter(x => x?.city_id === +e.target.value)
                            formikProps.setFieldValue('township_id', cityId_arr?.length > 0 ? (cityId_arr[0]?.township?.length > 0 ? cityId_arr[0]?.township[0]?.id : '') : '')
                          }}
                        >
                          <option value='' disabled>Select State/ Division</option>
                          {
                            cityList_data?.data.map((x, i) => (
                              <option value={x.city_id} key={i}>{x.city_name}</option>
                            ))
                          }
                        </Components.Select>
                        <Components.Select label={translate(translation_data, 'township', langStore?.code)} name="township_id" require={true} >
                          <option value='' disabled>Select Township</option>
                          {
                            cityList_data?.data?.filter(x => x?.city_id === +formikProps?.values?.state_division).map((x, i) => {
                              return x?.township?.map((y, index) => (
                                <option value={y.id} key={index}>{y.name}</option>
                              ))
                            })
                          }
                        </Components.Select>
                        <Components.TextArea label={translate(translation_data, 'address', langStore?.code)} name="address1" type="text" rows_height="130" require={true} />
                        <div className="deli-info">
                          <Text cu_size='18' weight='lg' style={{marginBottom: 25, marginTop: 40}}>{meta_data?.data?.deli_info?.name}</Text>
                          {meta_data?.data?.deli_info?.text_one?.split(/\r|\n/)?.map((val, key) => (
                            <Text key={key}>{val}</Text>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col lg="7">
                      <div className='product-table-container'>
                        {
                          cart_data?.data?.length > 0 ?
                          <Components.TableCom header={headerData} body={tableBody()} /> :
                          <Components.NoResult result='No Result Found' />
                        }
                      </div>
                    </Col>
                  </Row>
                  <div className='footer-btn-con'>
                    <Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                      {
                        formikProps.isSubmitting ?
                          <Loading style={{
                            width: 20,
                            height: 20,
                            border: '3px solid rgba(255, 255, 255, .23)',
                            borderRight: '3px solid rgba(255, 255, 255, .85)',
                          }}>{translate(translation_data, 'next', langStore?.code)}</Loading> :
                          translate(translation_data, 'next', langStore?.code)
                      }
                    </Button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </Container>
      </ShoppingCartSection>
    </>
  )
}

export default CheckOut