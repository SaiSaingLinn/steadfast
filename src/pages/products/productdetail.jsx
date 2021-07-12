import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Product, wishlist } from 'store/actions'
import { authStore } from 'service'
import { addToCart, moneyFormat, translate } from 'utils'
import Components, { Button } from 'components'
import { DetailSection } from './style/ProductStyle'
import { BsFillCaretUpFill, BsCaretDownFill, BsQuestionCircle } from 'react-icons/bs'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { DetailSlider, SliderBackground, NavBackground } from './style/detailsliderstyle'

// qty disabled style 
const DisabledWrap = styled.div`
    .disabled {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255,255,255,.5);
    }
  `

const ProductDetail = () => {
  const history = useHistory()
  const params = useParams()
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [isWishList, setIsWishList] = useState(false)
  // const [WishlistId, setWishlistId] = useState(null)
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState(true)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { product_list, category_data, product_detail, checkProductQty, isLoading } = useSelector(state => state.product)
  const { createcart_data, orderStore_data } = useSelector(state => state.ecommerce)
  const dispatch = useDispatch()

  // filter parent category
  const result = category_data?.data?.filter(item =>
    item?.sub_category.find(categ =>
      categ?.category_id === product_detail?.data[0]?.categories[0].id
    )
  )

  // filter sub category
  const subResult = result?.[0]?.sub_category?.filter(categ => categ.category_id === product_detail.data[0].categories[0].id)

  const breadcrumb_data = [
    {
      name: result?.[0]?.category_name
    },
    {
      name: subResult?.[0]?.category_name,
      link: `/products/list?category_id=${result?.[0]?.category_id}&subcategory_id=${subResult?.[0]?.category_id}`
    },
    {
      name: product_detail?.data?.[0]?.name
    }
  ]

  let slider1 = []
  let slider2 = []

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  useEffect(() => {
    //get product
    dispatch(Product.getProductById({
      product_id: +params.id,
      lang: langStore?.code
    }))

    //check wishlist
    handleExistWishlist(authStore.getAuth()?.uid || "", "", +params.id);

  }, [dispatch, langStore?.code, +params.id])

  const DetailList = props => (
    props?.data ? <Components.View as="div">
      <Components.Text as="label">{translate(translation_data, props.name, langStore?.code)}</Components.Text>
      <Components.Text as="span">{props.data}</Components.Text>
    </Components.View> : ''
  )

  // get related product
  useEffect(() => {
    const postData = {
      product_per_page: 5,
      sort_by: 'random',
      is_ticket_product: false,
      lang: langStore?.code,
      categ_id: subResult?.category_id
    }
    dispatch(Product.getProduct(postData))
  }, [dispatch, +params.id])

  let related_product = product_list?.data?.product_list?.filter(x => x?.product_id !== +params.id)
  // end related product 

  // check product qty 
  useEffect(() => {
    checkProductQty?.data[0]?.instock === false ? setStock(false) : setStock(true)
  }, [checkProductQty, setStock])

  const handleQty = (key) => () => {
    if (key === "add") {
      let num = qty;
      num += 1;
      setQty(num);
      handleCheckProductQty(+params.id, "", num);
    } else {
      if (qty > 1) {
        let num = qty;
        num -= 1;
        setQty(num);
        handleCheckProductQty(+params.id, "", num);
      }
    }
  }

  const handleChange = (e) => {
    var value = e.target.value.replace(/[^0-9]/, "");
    value = value === "" ? 1 : value;
    value = +value;
    setQty(value);
    handleCheckProductQty(+params.id, "", value);
  };

  const handleCheckProductQty = (product_id, variant_id, qty) => {
    dispatch(
      Product.checkProductQty(
        product_id,
        variant_id,
        qty,
        // product_detail,
        // langCode
      )
    );
  };

  // end of check product qty 

  // add to cart 
  const handleAddToCart = async () => {
    let ticket = false
    let postData = {
      user_id: authStore?.getAuth()?.uid,
      order_id: orderStore_data?.order_id,
      sale_order_line: [
        {
          product_id: +params.id,
          cart_status: 'add_cart',
          qty
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

  //alert wishlist msg
  const alertMessage = alert => {
    return (
      <>
        {alert === 'error' && <div><BsQuestionCircle /><span>{translate(translation_data, 'plz_login_to_add_wishlist', langStore?.code)}</span></div>}
      </>
    )
  }
  // end alert wishlist msg 

  // wishlist
  const handleWishlist = async () => {
    let postData = {
      user_id: authStore.getAuth()?.uid,
      product_id: +params.id
    }
    if (!authStore.getAuth().uid) {
      toast.error(alertMessage('error'), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    } else {
      handleAddWishlist(postData)
    }
  }

  const handleAddWishlist = async (postData) => {
    let exist_res = await handleExistWishlist(authStore.getAuth()?.uid || '', '', +params.id)
    if (exist_res?.data?.status === 'Does not exist!') {
      let res = await dispatch(wishlist.createWishlist(postData))
      if (res?.result?.status === 'success') {
        setIsWishList(true)
      } else {
      }
    } else if (exist_res?.data?.status === 'Exist!') {
      let wishlist_id = {
        id: exist_res?.data?.id
      }
      let res = await dispatch(wishlist.removeWishlist(wishlist_id))
      if (res?.result?.status === 'success') {
        setIsWishList(false)
      } else {
        console.log('wishlist remove error')
      }
    } else {
      console.log('wishlist exist error')
    }
  }

  const handleExistWishlist = async (uid, variant_id, product_id) => {
    let exist_res = await dispatch(wishlist.existsWishlist(uid, variant_id, product_id))
    if (exist_res?.data?.status === 'Does not exist!') {
      setIsWishList(false)
    } else if (exist_res?.data?.status === 'Exist!') {
      setIsWishList(true)
    } else {
      console.log('wishlist exist error')
    }
    return exist_res
  }
  // end of wishlist

  return (
    !isLoading &&
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <DetailSection>
        <ToastContainer />
        <Components.Container>
          <Components.Row>
            <Components.Col md="5">
              <DetailSlider>
                <Slider
                  infinite={product_detail?.gallery?.length > 4 ? true : false}
                  arrows={false}
                  asNavFor={nav2}
                  ref={slider => (slider1 = slider)}
                >
                  {
                    product_detail?.data?.[0]?.gallery?.length > 0 ?
                      product_detail?.data?.[0]?.gallery?.map((x, i) => (
                        <div key={i}>
                          <SliderBackground data={x} />
                        </div>
                      ))
                      :
                      <SliderBackground data={require('../../assets/img/no-img.jpg').default} />
                  }
                </Slider>
                <Slider
                  className="slide-nav"
                  infinite={product_detail?.data?.[0]?.gallery?.length > 4 ? true : false}
                  asNavFor={nav1}
                  ref={slider => (slider2 = slider)}
                  slidesToShow={4}
                  swipeToSlide={true}
                  focusOnSelect={true}>
                  {
                    product_detail?.data?.[0]?.gallery?.map((x, i) => (
                      <div key={i}>
                        <NavBackground data={x} />
                      </div>
                    ))
                  }
                </Slider>
              </DetailSlider>
            </Components.Col>
            <Components.Col md="7">
              <Components.Text as="h5" color="primary" weight="lg">
                {product_detail?.data?.[0]?.name}
              </Components.Text>
              <Components.View as="div" className="price-wrap">
                <Components.Text as="span" weight="lg">
                  {product_detail?.data?.[0]?.promotion?.length > 0 ?
                    <span>
                      {
                        product_detail?.data?.[0]?.list_price - ((product_detail?.data?.[0]?.promotion?.[0]?.discount_percent / 100) * product_detail?.data?.[0]?.list_price)
                      } Ks
                    </span> :
                    <span>{moneyFormat(product_detail?.data?.[0]?.list_price)} Ks</span>
                  }
                </Components.Text>
                {product_detail?.data?.[0]?.promotion?.length > 0 &&
                  <>
                    <Components.Text as="del" size="md">{moneyFormat(product_detail?.data?.[0]?.list_price)} Ks</Components.Text>
                    <Components.Text as="span" size="md" weight="lg">{`-${product_detail?.data?.[0]?.promotion?.[0]?.discount_percent}%`}</Components.Text>
                  </>
                }
              </Components.View>
              <Components.View as="div" className="spec-wrap">
                <DetailList data={product_detail?.data?.[0]?.brand?.name} name='brand' />
                <DetailList data={product_detail?.data?.[0]?.code} name='item' />
                <DetailList data={product_detail?.data?.[0]?.service_weight} name='size_weight' />
              </Components.View>
              <Components.Quantity>
                <Components.View as="div" className="quantity-wrap">
                  <Components.Text as="label">{translate(translation_data, 'quantity', langStore?.code)}</Components.Text>
                  <Components.InputGroup className="mb-0 quantity-input-gp">
                    <Components.Input value={qty} onChange={handleChange} />
                    <Components.Text as="div" className="arrow-btn">
                      <BsFillCaretUpFill onClick={handleQty("add")} />
                      <BsCaretDownFill onClick={handleQty("sub")} />
                    </Components.Text>
                    <DisabledWrap>
                      <div className={product_detail?.data?.[0]?.status !== 'in_stock' ? 'disabled' : ''}></div>
                    </DisabledWrap>
                  </Components.InputGroup>
                  <Components.Button
                    className={`btn btn-default ${(product_detail?.data?.[0]?.status !== 'in_stock' && 'btn-disabled') || (stock === false && 'btn-disabled')}`}
                    onClick={() => handleAddToCart()}
                    disabled={(product_detail?.data?.[0]?.status !== 'in_stock' && 'disabled') || (stock === false && 'disabled')}
                  >
                    {translate(translation_data, 'add_to_cart', langStore?.code)}
                  </Components.Button>
                </Components.View>
              </Components.Quantity>
              <Components.View as="div" className="spec-wrap">
                <Components.View as="div">
                  <Components.Text as="label">{translate(translation_data, 'availability', langStore?.code)}</Components.Text>
                  {stock ?
                    <Components.Text as="span">
                      {
                        product_detail?.data?.[0]?.status === 'in_stock' ? 'In Stock' : 'Temporarily out of stock'
                      }
                    </Components.Text> :
                    <Components.Text as="span">{translate(translation_data, 'temporarily_out_of_stock', langStore?.code)}</Components.Text>
                  }
                </Components.View>

                <DetailList data={product_detail?.data?.[0]?.company_name} name='company_name' />

              </Components.View>
              <Components.View as="div" className="wishlist-container" onClick={() => handleWishlist()}>
                <Components.View as="div" className="icon-wrap">
                  {isWishList ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </Components.View>
                <Components.Text as="span" color="secondary">{translate(translation_data, 'add_to_wishlist', langStore?.code)}</Components.Text>
              </Components.View>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </DetailSection>
      <DetailSection>
        <Components.Container>
          <Components.Row>
            <Components.Col space="12">
              <Components.View as="div" className="desc-wrap">
                <Components.Text as="h5" color="primary" weight="lg">{translate(translation_data, 'product_description', langStore?.code)}</Components.Text>
                <Components.Text as="div" color="primary">
                  {product_detail?.data?.[0]?.description?.split(/\r|\n/)?.map((val, key) => (
                    <p key={key}>{val}</p>
                  ))}
                </Components.Text>
              </Components.View>
              {
                product_detail?.data?.[0]?.youtube_url &&
                <Components.View as="div" className="video-wrap">
                  <ReactPlayer
                    url={product_detail?.data?.[0]?.youtube_url}
                    playing={false}
                    width='auto'
                    height='500px'
                  />
                </Components.View>
              }
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </DetailSection>
      {
        related_product?.length > 0 &&
        <Components.Section>
          <Components.Container>
            <Components.Row>
              <Components.Col space="12">
                <Components.Title style={{ marginBottom: 50 }}>{translate(translation_data, 'related', langStore?.code)} <span>{translate(translation_data, 'products', langStore?.code)}</span></Components.Title>
                <Components.ProductCard product_data={{ data: { product_list: related_product } }} link="/product/detail" col="3" />
              </Components.Col>
            </Components.Row>
          </Components.Container>
        </Components.Section>
      }

      {/* <Components.SuccessMsg>
        <Components.Text color="primary" className="alert-msg">Your orders have been placed successfully!</Components.Text>
        <div className="contact-info">
          <Components.Text as="label" color="muted">Order ID</Components.Text>
          <Components.Text as="span" color="muted">ID123123</Components.Text>
        </div>
        <div className="contact-info">
          <Components.Text as="label" color="muted">Date</Components.Text>
          <Components.Text as="span" color="muted">14/12/2020 05:11:42</Components.Text>
        </div>
      </Components.SuccessMsg> */}

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

export default ProductDetail