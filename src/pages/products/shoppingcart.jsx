import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Components, { Container, Row, Col, Quantity, View, Text, Button, Image, Tr, Td, Input, InputGroup } from '../../components'
import { ShoppingCartSection } from './style/ProductStyle'
import { BsFillCaretUpFill, BsCaretDownFill, BsQuestionCircle } from 'react-icons/bs'
import { Ecommerce } from 'store/actions'
import { translate, moneyFormat } from 'utils'
import { authStore } from 'service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let tmp = null

const ShoppingCart = () => {
  const history = useHistory()
  const { ...para } = useParams()
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { cart_data } = useSelector(state => state.ecommerce)
  const [productId, setProductId] = useState(null)
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    para?.id && dispatch(Ecommerce.getCart(para?.id || '', authStore?.getAuth()?.uid || '', langStore?.code))
  }, [dispatch, langStore?.code, para?.id])

  // qty change 
  const handleTechQtyChange = async (key, product_id, value, index) => {
    clearTimeout(tmp)
    cart_data.data[index].quantity = value
    
    tmp = setTimeout(() => {
      handleQtyChange(key, product_id, value)
    }, 350)
  }

  const handleQtyChange = async (key, product_id, value) => {
    let ticket = false
    let qty = value
    if (key === 'add') {
      qty += 1
    } else if (key === 'sub') {
      qty -= 1
    } else if (key === 'other') {
      qty = (qty === '' ? 1 : qty)
      qty = +qty
    }

    let postData = {
      user_id: authStore?.getAuth()?.uid || '',
      order_id: +para?.id,
      sale_order_line: [
        {
          // cart_status: "add_cart",  // important
          product_id,
          qty
        }
      ]
    }

    if (!authStore.getAuth()) {
      delete postData.user_id
    }

    let res = await dispatch(Ecommerce.createCart(postData, authStore?.getAuth()?.uid, langStore?.code, ticket))
    if (res?.result[0]?.status !== 'fail') {
      
    } else {
      toast.error(alertMessage('error'), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
      
    }
  }
  //end qty change

  //alert qty msg
  const alertMessage = alert => {
    return (
      <>
        {alert === 'error' && <div><BsQuestionCircle /><span>{translate(translation_data, 'not_enough_stock', langStore?.code)}</span></div>}
      </>
    )
  }
  // end alert qty msg 

  // handle modal 
  const [state, setState] = useState({
    isModal: false,
    msg: null,
  })

  const [isSetTimeOut, setIsSetTimeOut] = useState(false)

  useEffect(() => {
    state.isModal === false && setIsSetTimeOut(false)
  }, [state.isModal])

  const handleIsModal = (isModal, msg) => {
    setState({
      ...state,
      isModal,
      msg
    })
  }
  // end handle modal

  // handle remove cart 
  const handleRemove = async () => {
    let postData = {
      data: {
        order_id: +para?.id,
        product_id: productId,
        user_id: authStore.getAuth()?.uid
      }
    }

    if (!authStore.getAuth()) {
      delete postData.data.user_id
    }

    let res = await dispatch(Ecommerce.deleteCart(postData, langStore?.code))
    if (res?.result?.status === 'success') {
      handleIsModal(false, '')
    } else {
      handleIsModal(false, '')
    }
  }

  //go to checkout
  const goToCheckOut = () => {
    history.replace(`/checkout/${+para?.id}`)
  }

  const breadcrumb_data = [{ name: translate(translation_data, 'shopping_cart', langStore?.code) }]

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
              <div className="img-wrap" style={{justifyContent: 'flex-start'}}>
                {/* {
                  x?.product_type === 'service' && Math.sign(x?.price_unit) >= 0 ?
                  <Image src={require('../../assets/icons/shipped.svg').default} alt='' style={{marginRight: 10, width: 100}} />
                  :
                  x?.product_type === 'product' ?
                  <Image src={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} alt="product" style={{marginRight: 10, width: 100}} />
                  :
                  ''
                } */}
                {
                  x?.product_type === 'product' &&
                  <Image src={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} alt="product" style={{marginRight: 10, width: 100}} />
                }
                <Text>{x?.product}</Text>
              </div>
            </Td>
            <Td halign="center" className="price">
              <Text className="mobile-caption">{translate(translation_data, 'price', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_unit)} Ks</Text>
            </Td>
            {
              x?.product_type === 'product' ?
              <Td halign="center">
                <Text className="mobile-caption">{translate(translation_data, 'quantity', langStore?.code)}</Text>
                <Quantity>
                  <View as="div" className="quantity-wrap">
                    <InputGroup className="mb-0 quantity-input-gp">
                      <Input value={x?.quantity} onChange={e => handleTechQtyChange('other', x?.product_tmpl_id, e.target.value.replace(/[^0-9]/, ''), i)}/>
                      <Text as="div" className="arrow-btn">
                        <BsFillCaretUpFill onClick={() => handleTechQtyChange('add', x?.product_tmpl_id, x?.quantity, i)}/>
                        <BsCaretDownFill onClick={() => handleTechQtyChange('sub', x?.product_tmpl_id, x?.quantity, i)}/>
                      </Text>
                    </InputGroup>
                  </View>
                </Quantity>
              </Td>
              :
              <Td></Td>
            }
            <Td halign="center"  className="price">
              <Text className="mobile-caption">{translate(translation_data, 'subtotal', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_subtotal)} Ks</Text>
            </Td>
            <Td halign="center" className="remove-wrap">
            {
              x?.product_type === 'product' &&
              <div className="remove" onClick={() => {setProductId(x?.product_id); handleIsModal(true, translate(translation_data, 'are_you_sure_you_want_to_delete_this_item', langStore?.code))}}>
                <Image src={require('../../assets/img/icons/cancel.svg').default} alt="name" />
                <button>Remove</button>
              </div>
            }
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
      <Tr>
        <Td colSpan="4" halign="right">
          <Button onClick={() => goToCheckOut()} className="btn btn-default">
            {translate(translation_data, 'process_to_checkout', langStore?.code)}
          </Button>
        </Td>
      </Tr>
    </>
  )
  
  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <ShoppingCartSection>
        <Container>
          <Row>
            <Col space="12">
              <div className='product-table-container shopping-cart'>
                {
                  cart_data?.data?.length > 0 ?
                  <Components.TableCom header={headerData} body={tableBody()} /> :
                  <>
                    <Components.NoResult result='No item in cart' />
                    <div style={{textAlign: "center", paddingBottom: 30}}>
                      <Link to='/' className="btn btn-default">{translate(translation_data, 'continue_shopping', langStore?.code)}</Link>
                    </div>
                  </>
                }
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </ShoppingCartSection>
      <Components.Modal data={{ isModal: state.isModal, handleIsModal, isSetTimeOut }}>
        <div className="modal-body">
          <div className='success-title'>
            <img src={require("../../assets/icons/remove-from-cart.svg").default} alt="" />
          </div>
          <div className='success-body'>
            <Components.Text size="md" color="primary">{state?.msg}</Components.Text>
          </div>
          <div className='success-btn'>
            <Button className="btn btn-default" onClick={() => handleRemove()}>{translate(translation_data, 'confirm', langStore?.code)}</Button>
            <Button className="btn btn-gray" onClick={() => handleIsModal(false)}>{translate(translation_data, 'cancel', langStore?.code)}</Button>
          </div>
        </div>
      </Components.Modal>
    </>
  )
}

export default ShoppingCart