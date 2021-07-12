import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Components, { Container, Row, Col, Text, Button, Image, Tr, Td, InputGroup, Input, Label } from '../../components'
import { ShoppingCartSection } from './style/ProductStyle'
import { Ecommerce } from 'store/actions'
import { authStore } from 'service'
import { translate, moneyFormat } from 'utils'
import Loading from 'components/Loading'

const Payment = props => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { cart_data, paymentList_data } = useSelector(state => state.ecommerce)
  const { ...para } = useParams()
  let order_id = +para?.id
  let order_name = cart_data?.sale_order
  let ticket = false
  // get cart 
  useEffect(() => {
    para?.id && dispatch(Ecommerce.getCart(para?.id || '', authStore?.getAuth()?.uid || '', langStore?.code))
    dispatch(Ecommerce.getPaymentList(authStore?.getAuth()?.uid || '', ticket))
  }, [dispatch, langStore?.code, para?.id, ticket])

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
    check: Yup.boolean()
      .test(
        'is-true',
        'Check value is required',
        value => value === true
      )
  })

  let initialValues = {
    check: false
  }

  const handleUserCheck = e => {
    dispatch(Ecommerce.getPaymentChange('payment_method_id', paymentList_data?.data, e?.payment_method_id))
  }

  const onDataSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      let paymentPostData = {
        order_id: +para?.id,
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
            pathname: `/product-order-success`,
            state: { order_id, order_name }
          })
          await dispatch(Ecommerce.setOrderStore('ORDER_STORE_REMOVE_OBJ', null))
        }
        actions.setSubmitting(false)
        setDisabled(false)
      } else {
        console.log('Something went wrong!')
      }
      actions.setSubmitting(false)
    }, 1000)
  }

  const link_condition = <span htmlFor="check" className="custom-check agree" style={{paddingTop: 3, overflow: 'visible', textTransform: 'none'}}>I agree with apogee's <Link to='/termsandconditions' target="_blank" style={{ color: '#FF0000', textDecoration: 'none' }}>terms and conditions.</Link> <span style={{ color: "#FF0000" }}> *</span></span>
  const breadcrumb_data = [{ name: translate(translation_data, 'payment', langStore?.code) }]
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
                      {
                        location?.state?.address1 && 
                        <div className="payment address">
                          <Text weight='lg' className="title">{translate(translation_data, 'delivery_address', langStore?.code)}</Text>
                          <Text weight="md">{location?.state?.address1}</Text>
                        </div>
                      }
                      <div className="payment paywith">
                        <Text weight='lg' className="title">{translate(translation_data, 'paywith', langStore?.code)}</Text>
                          <div className='item-wrap'>
                            {
                              paymentList_data?.data?.length > 0 && paymentList_data?.data?.map((x, i) => (
                                <InputGroup className="custom-radio" key={i} onClick={() => handleUserCheck(x)}>
                                  <Input
                                    value={x?.payment_method_id}
                                    type="radio" 
                                    name="payment" 
                                    id={x?.payment_method_id} 
                                    checked={x?.check}
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
                      <InputGroup style={{marginBottom: 30}}>
                        <Components.CheckBox type="checkbox" name="check" label={link_condition} />
                      </InputGroup>
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
                            }}>{translate(translation_data, 'order_now', langStore?.code)}</Loading> :
                            translate(translation_data, 'order_now', langStore?.code)
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

export default Payment