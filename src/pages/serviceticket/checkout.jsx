import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Components, { InputGroup, Input, Label } from '../../components'
import { ServiceTicketSection, ServiceBgImage } from './style/ServiceTicketStyle'
import { Location, Ecommerce } from 'store/actions'
import { authStore } from 'service'
import { translate, moneyFormat } from 'utils'
import Loading from 'components/Loading'
import { BiArrowBack } from "react-icons/bi"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const CheckOut = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { ...para } = useParams()
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { profile_data } = useSelector(state => state.profile)
  const { cityList_data } = useSelector(state => state.location)
  const { cart_ticket_data, paymentList_data, isLoading } = useSelector(state => state.ecommerce)
  let order_id = para?.id
  let order_name = cart_ticket_data?.sale_order
  let ticket = true
  // get state and division id 
  useEffect(() => {
    dispatch(Location.getCityList(langStore?.code))
  }, [dispatch, langStore?.code])

  // get cart 
  useEffect(() => {
    order_id && dispatch(Ecommerce.getTicketCart(order_id || '', authStore?.getAuth()?.uid || '', langStore?.code))
    dispatch(Ecommerce.getPaymentList(authStore?.getAuth()?.uid || '', ticket))
  }, [dispatch, langStore?.code, order_id, ticket])
  // console.log(`cart_ticket_data`, cart_ticket_data)
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
    check: Yup.boolean()
      .test(
        'is-true',
        'Check value is required',
        value => value === true
      )
  })

  let initialValues = { 
    name: profile_data?.data[0]?.name || '', 
    mobile: profile_data?.data[0]?.mobile|| '',
    address1: profile_data?.data[0]?.street || '', 
    state_division: profile_data?.data[0]?.state_division_id || '', 
    township_id: profile_data?.data[0]?.township_id || '',
    check: false
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
        order_id: para?.id,
      }
      
      let res = await dispatch(Ecommerce.createShipping(postData))
      if (res?.result?.status?.toLowerCase() === 'success') {
        let paymentPostData = {
          order_id: para?.id,
          acquirer_id: paymentList_data?.selected_id,
          user_id: authStore?.getAuth()?.uid || ''
        }
        
        if (!authStore?.getAuth()) {
          delete paymentPostData.user_id
        }

        let payment_method_code = paymentList_data?.data?.filter(x => x.payment_method_id === paymentList_data?.selected_id)[0]?.payment_method_code

        let res = await dispatch(Ecommerce.payNow(paymentPostData))
        if (res?.result?.status.toLowerCase() === 'success') {
          if (payment_method_code === '2C2P') {
            delete paymentPostData.user_id
            delete paymentPostData.acquirer_id
            let otherPayment_res = await dispatch(Ecommerce.payNow(paymentPostData, 'other_pay'))
            if (otherPayment_res?.result?.respCode === '0000') {
              window.location.assign(otherPayment_res?.result?.webPaymentUrl)
            }
          } else {
            history.replace({
              pathname: `/service-ticket/ticket-order-success`,
              state: { order_id, order_name }
            })
            await dispatch(Ecommerce.setOrderStore('ORDER_STORE_REMOVE_OBJ', null))
          }
          actions.setSubmitting(false)
          setDisabled(false)
        } else {
          console.log('Something went wrong!')
        }
        window.scrollTo(0, 0)
      } else {
        console.log('Something went wrong!')
      }
    }, 1000)
  }

  // goto login 
  // const goToLogin = () => {
  //   history.replace({
  //     pathname: `/signin`,
  //     state: { order_id, type: "ticket" }
  //   })
  // }

  const handleUserCheck = e => {
    dispatch(Ecommerce.getPaymentChange('payment_method_id', paymentList_data?.data, e?.payment_method_id))
  }

  const link_condition = <span htmlFor="check" className="custom-check agree" style={{paddingTop: 3, overflow: 'visible', textTransform: 'none'}}>I agree with apogee's <Link to='/termsandconditions' target="_blank" style={{ color: '#FF0000', textDecoration: 'none' }}>terms and conditions.</Link> <span style={{ color: "#FF0000" }}> *</span></span>

  const breadcrumb_data = [
    {
      link: '/service-ticket',
      name: 'Service Ticket'
    },
    {
      name: 'Ticket Name'
    }
  ]

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <ServiceTicketSection>
        <Components.Container>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => onDataSubmit(values, actions)}>
            {
              formikProps => (
              <Form>
                <Components.Row>
                  <Components.Col md="5">
                    <Components.View as="div" className="checkout-wrap">
                      <Components.View as="div" className="d-flex form-title">
                        <Components.Text as="h5">{translate(translation_data, 'buyer_address', langStore?.code)}</Components.Text>
                        {/* {
                          !authStore?.getAuth()?.uid &&
                          <Button className='btn btn-gray' onClick={() => goToLogin()}>Login</Button>
                        } */}
                      </Components.View>
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
                      <Components.CheckBox type="checkbox" name="check" label={link_condition} />
                    </Components.View>
                  </Components.Col>
                  <Components.Col md="7">
                    <React.Fragment>
                      {
                        !isLoading &&
                        <Components.View as="div" className="checkout-detail">
                          <Components.View as="div" className="info-wrap">
                            {
                              cart_ticket_data?.data?.length > 0 &&
                              cart_ticket_data?.data?.filter(y => Math.sign(y?.price_unit) >= 0).map((x, i) => (
                                <Components.View as="div" className="detail-img" key={i}>
                                  <ServiceBgImage data={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} checkout={true} />
                                </Components.View>
                              ))
                            }
                            <Components.View as="div" className="detail-info">
                              {
                                cart_ticket_data?.data?.length > 0 &&
                                cart_ticket_data?.data?.map((x, i) => (
                                  <Components.View as="div" className="detail-wrap" key={i}>
                                    <Components.View as="div" className="detail-content">
                                      {
                                        Math.sign(x?.price_unit) >= 0 &&
                                        <Components.Text className="title">{x?.product}</Components.Text>
                                      }
                                      <Components.View as="div">
                                        {
                                          Math.sign(x?.price_unit) >= 0 ?
                                          <Components.Text as="label">{translate(translation_data, 'price', langStore?.code)}:</Components.Text> :
                                          <Components.Text as="label">{translate(translation_data, 'discount', langStore?.code)}:</Components.Text>
                                        }
                                        <Components.Text as="span" weight="lg">{moneyFormat(x?.price_unit)} Ks</Components.Text>
                                      </Components.View>
                                      {
                                        Math.sign(x?.price_unit) >= 0 &&
                                        <Components.View as="div">
                                          <Components.Text as="label">{translate(translation_data, 'quantity', langStore?.code)}:</Components.Text>
                                          <Components.Text as="span" weight="lg">{moneyFormat(x?.quantity)}</Components.Text>
                                        </Components.View>
                                      }
                                      {
                                        Math.sign(x?.price_unit) >= 0 &&
                                        <Components.View as="div" style={{borderTop: '1px solid #DDD', paddingTop: 5}}>
                                          <Components.Text as="label" style={{fontWeight: 'bold'}}>{translate(translation_data, 'subtotal', langStore?.code)}:</Components.Text>
                                          <Components.Text as="span" weight="lg">{moneyFormat(x?.price_subtotal)} Ks</Components.Text>
                                        </Components.View>
                                      }
                                    </Components.View>
                                  </Components.View>
                                ))
                              }
                              <Components.View as="div" className="detail-wrap">
                                <Components.Text as="label">{translate(translation_data, 'tax', langStore?.code)}:</Components.Text>
                                <Components.Text as="span" weight="lg">{moneyFormat(cart_ticket_data?.taxes)} Ks</Components.Text>
                              </Components.View>
                              <Components.View as="div" style={{borderTop: '1px solid #DDD', paddingTop: 5}} className="detail-wrap">
                                <Components.Text as="label" style={{fontWeight: 'bold'}}>{translate(translation_data, 'total_amount', langStore?.code)}:</Components.Text>
                                <Components.Text as="span" weight="lg">{moneyFormat(cart_ticket_data?.amount_total)} Ks</Components.Text>
                              </Components.View>
                            </Components.View>
                          </Components.View>
                        </Components.View>
                      }
                      <Components.View as="div" className="checkout-detail">
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
                        <div className='btn-wrap'>
                          <Link className="btn btn-back" to='#' onClick={() => history.goBack()}><BiArrowBack /> {translate(translation_data, 'back', langStore?.code)}</Link>
                          <Components.Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                            {
                              formikProps.isSubmitting ?
                                <Loading style={{
                                  width: 20,
                                  height: 20,
                                  border: '3px solid rgba(255, 255, 255, .23)',
                                  borderRight: '3px solid rgba(255, 255, 255, .85)',
                                }}>{translate(translation_data, 'submitting', langStore?.code)}</Loading> :
                                translate(translation_data, 'submit', langStore?.code)
                            }
                          </Components.Button>
                        </div>
                      </Components.View>
                    </React.Fragment>
                  </Components.Col>
                </Components.Row>
              </Form>
            )
          }
          </Formik>
        </Components.Container>
      </ServiceTicketSection>
    </>
  )
}

export default CheckOut
