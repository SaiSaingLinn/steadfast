import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Container, Input } from 'components/core'
import { Wrapper, MenuDropdown, MenuIcon } from './style/headerstyle'
import { BiSearch } from 'react-icons/bi'
import { FaRegUser } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { emit, profile } from 'store/actions'
import { authStore } from 'service'
import { auth } from 'store/actions'
import { Ecommerce } from 'store/actions/ecommerce.action'
import { translate } from 'utils'

export default function SecondaryNav() {
  const history = useHistory()
  const [productName, setProductName] = useState('')
  const { isProfileData } = useSelector(state => state.emit)
  const { profile_data } = useSelector(state => state.profile)
  const { orderStore_data, cart_data } = useSelector(state => state.ecommerce)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const dispatch = useDispatch()

  let user_id = authStore.getAuth()?.uid

  //get profile data
  useEffect(() => {
    user_id && dispatch(profile.getProfile(user_id))
  }, [dispatch, user_id])

  useEffect(() => {
    profile_data !== null && dispatch(emit.setEmit('ISPROFILEDATA', ...profile_data?.data))
  }, [dispatch, profile_data])

  // get cart data for shopping cart number items
  useEffect(() => {
    orderStore_data?.order_id && dispatch(Ecommerce.getCart(orderStore_data?.order_id || '', user_id || '', langStore?.code))
  }, [dispatch, langStore?.code, orderStore_data?.order_id, user_id])
  // console.log(`cart_data`, cart_data)
  let cartProduct_data = cart_data?.data?.filter(x => x?.product_type === 'product')
  // end get cart 

  // sign out 
  const handleSignOut = async () => {
    //* delete cart when sign out
    if (orderStore_data?.order_id) {
      let postData = {
        data: {
          order_id: orderStore_data?.order_id,
          user_id: authStore.getAuth()?.uid
        }
      }

      if (!authStore.getAuth()) {
        delete postData.data.user_id
      }

      let res = await dispatch(Ecommerce.deleteAllInCart(postData, langStore?.code))
      if (res?.result?.status === 'success') {
        console.log(`res delete all success`, res)
      } else {
        console.log(`res delete all fail`, res)
      }
    }

    dispatch(auth.signOut())
    dispatch(Ecommerce.setOrderStore('ORDER_STORE_REMOVE_OBJ', null))
    dispatch(profile.cleanData('PROFILE_CLEAND_DATA', null))
  }

  const handleSearch = () => {
    productName !== '' && history.push(`/products/search?key=${encodeURI(productName)}`)
    // setProductName('')
  }

  // go to cart 
  const handleGoToCart = () => {
    history.push(`/shoppingcart/${orderStore_data?.order_id || 'no-item'}`)
  }

  return (
    <Wrapper secondary>
      <Container>
        <div className="secondaryNav">
          <Link to="/" className="logo-img">
            <img className="steadfast-logo" src={require('../../assets/img/icons/stead-fast-logo.png').default} alt="logo" />
          </Link>

          <div className="nav-center">
            <Input
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
              type="text" placeholder={langStore?.code ? translate(translation_data, 'search_product', langStore?.code)?.toString() : ''} className="search-box"
            />
            <div className="search-icon" onClick={() => handleSearch()}>
              <BiSearch />
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-flex">
              <div className="user-wrap d-flex border-right">
                {
                  authStore.getAuth()?.uid ?
                    <MenuDropdown className="d-flex">
                      <FaRegUser className='user-icon' />
                      <p className="user-info">
                        <span className="sub">{translate(translation_data, 'welcome', langStore?.code)}</span>
                        <br />
                        <span className="title">{isProfileData?.name}</span>
                      </p>
                      <div className="drp-wrap">
                        <ul className="drp-ul">
                          <li>
                            <Link to='/profile'>
                              {translate(translation_data, 'my_profile', langStore?.code)}
                            </Link>
                          </li>
                          <li>
                            <Link to='/orderhistory'>
                              {translate(translation_data, 'my_orders', langStore?.code)}
                            </Link>
                          </li>
                          <li>
                            <Link to='/myservice'>
                              {translate(translation_data, 'my_service_ticket', langStore?.code)}
                            </Link>
                          </li>
                          <li>
                            <Link to='/wishlist'>
                              {translate(translation_data, 'my_wishlist', langStore?.code)}
                            </Link>
                          </li>
                          <li>
                            <Link to="/" onClick={() => handleSignOut()}>{translate(translation_data, 'logout', langStore?.code)}</Link>
                          </li>
                        </ul>
                      </div>
                    </MenuDropdown>
                    :
                    <MenuDropdown className="d-flex">
                      <FaRegUser className='user-icon' />
                      <p className="user-info">
                        <span className="sub">{translate(translation_data, 'login_here', langStore?.code)}</span>
                        <br />
                        <span className="title">{translate(translation_data, 'my_account', langStore?.code)}</span>
                      </p>
                      <div className="drp-wrap">
                        <ul className="drp-ul">
                          <li>
                            <Link to='/signin'>
                              {translate(translation_data, 'login', langStore?.code)}
                            </Link>
                          </li>
                          <li>
                            <Link to='/signup'>
                              {translate(translation_data, 'sign_up', langStore?.code)}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </MenuDropdown>
                }
              </div>

              <div className="user-wrap d-flex border-right">
                <MenuDropdown className="d-flex" onClick={() => handleGoToCart()}>
                  <AiOutlineShoppingCart />
                  {
                    cartProduct_data?.length > 0 &&
                    <span className="item">{cartProduct_data?.reduce((total, value) => total + value.quantity, 0)}</span>                    
                  }
                  <p className="user-info">
                    <span className="sub">{translate(translation_data, 'shopping_cart', langStore?.code)}</span>
                    <br />
                    {
                      cartProduct_data?.length > 0 &&
                      <span className="title">{cartProduct_data?.reduce((total, value) => total + value.quantity, 0)} Items</span>
                    }
                  </p>
                </MenuDropdown>
              </div>

              <MenuIcon className="menu-btn">
                <div className="menu-icon"></div>
              </MenuIcon>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}