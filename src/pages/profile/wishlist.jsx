import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Components, { Container, Row, Col, Text, Tr, Td, Image, Button } from '../../components'
import { Profile } from './style/profilestyle'
import { wishlist } from 'store/actions'
import { authStore } from 'service'
import { addToCart, moneyFormat, translate } from 'utils'

const Wishlist = () => {
  const history = useHistory()
  const { wishlist_data } = useSelector(state => state.wishlist)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { createcart_data, orderStore_data } = useSelector(state => state.ecommerce)
  let user_id = authStore.getAuth()?.uid
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wishlist.getWishlist(langStore?.code, user_id))
  }, [dispatch, langStore?.code, user_id])

  // console.log(`wishlist_data`, wishlist_data)
  
  const headerData = [
    {
      title: translate(translation_data, 'product', langStore?.code)
    },
    {
      title: translate(translation_data, 'price', langStore?.code)
    },
    {
      title: ""
    },
    {
      title: ""
    }
  ]

  const handleRemoveWishlist = async (id) => {
    let postData = {
      id
    }
    let res = await dispatch(wishlist.removeWishlist(postData))
    if (res?.result?.status === 'success') {
      dispatch(wishlist.getWishlist(langStore?.code, user_id))
    } else {
      console.log('error', res)
    }
  }
  

  // add to cart 
  const handleAddToCart = async (product_id) => {
    let ticket = false
    let postData = {
      user_id: authStore?.getAuth()?.uid,
      order_id: orderStore_data?.order_id,
      sale_order_line: [
        {
          product_id,
          cart_status: 'add_cart',
          qty: 1
        }
      ]
    }
    let create_cart_res = await dispatch(addToCart(postData, langStore?.code, ticket))
    if (create_cart_res?.result?.[0]?.status === 'success') {
      handleIsModal(true, translate(translation_data, 'add_to_cart_success', langStore?.code))
    } else {
      console.log(`add to cart error`)
    }
    setIsSetTimeOut(true)
  }
  // end add to cart 

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

  // goto cart 
  const handleGoToCart = () => {
    handleIsModal(false);
    history.push(
      `/shoppingcart/${createcart_data?.result[0]?.order_id}`
    );
  };

  const breadcrumb_data = [{ name: translate(translation_data, 'my_wishlist', langStore?.code) }]

  const tableBody = () => (
    wishlist_data?.map((x, i) => (
      <Tr key={i}>
        <Td style={{maxWidth: 300}}>
          <Text className="mobile-caption">{translate(translation_data, 'product', langStore?.code)}</Text>
          <div style={{ justifyContent: "start"}} className="img-wrap">
            {
              <Image src={x?.image ? x?.image : require('../../assets/img/no-img.jpg').default} alt="product" style={{marginRight: 10, width: 100}}/>
            }
            <Text style={{ textAlign: "left" }}>{x?.name}</Text>
          </div>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'price', langStore?.code)}</Text>
          <Text>{moneyFormat(x?.list_price)} Ks</Text>
        </Td>
        <Td halign="center" className="addcart-btn">
          <Button 
            className={`btn btn-default ${x?.status !== 'in_stock' && 'btn-disabled'}`}
            disabled={x?.status !== 'in_stock' && 'disabled'}
            onClick={() => handleAddToCart(x?.product_id)} >
            {translate(translation_data, 'add_to_cart', langStore?.code)}
          </Button>
          {
            x?.status !== 'in_stock' &&
            <Components.Text as="span" style={{fontSize: 14, border: '0 none', marginTop: 5, display: 'block'}}>{translate(translation_data, 'temporarily_out_of_stock', langStore?.code)}</Components.Text>
          }
        </Td>
        <Td halign="center">
          <img style={{cursor: "pointer"}} src={require("../../assets/img/icons/cancel.svg").default} alt="/" onClick={() => handleRemoveWishlist(x?.w_id)} />
        </Td>
      </Tr>
    ))
  )

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Container>
          <Row>
            <Col sm="3">
              <Components.Sidebar profile={true} />
            </Col>
            <Col sm="9">
              <Profile>
                <Text className="title">{translate(translation_data, 'my_wishlist', langStore?.code)}</Text>
                {
                  wishlist_data?.length > 0 ?
                    <Components.TableCom header={headerData} body={tableBody()} />
                    :
                    <Components.NoResult result='No Wishlist Found' />
                }
              </Profile>
            </Col>
          </Row>
        </Container>
      </Components.Section>
      <Components.Modal data={{ isModal: state.isModal, handleIsModal, isSetTimeOut }}>
        <div className="modal-body">
          <div className='success-title'>
            <img src={require("../../assets/img/icons/add-to-cart.svg").default} alt="" />
          </div>
          <div className='success-body'>
            <Components.Text size="md" color="primary">{state?.msg}</Components.Text>
          </div>
          <div className='success-btn'>
            <Button className="btn btn-default" onClick={() => handleGoToCart()}>{translate(translation_data, 'go_to_cart', langStore?.code)}</Button>
            <Button className="btn btn-gray" onClick={() => handleIsModal(false)}>{translate(translation_data, 'close', langStore?.code)}</Button>
          </div>
        </div>
      </Components.Modal>
    </>
  )
}

export default Wishlist
