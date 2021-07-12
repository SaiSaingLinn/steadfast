import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import Components from 'components'
import { Product } from 'store/actions'
import { authStore } from 'service'
import { addToCart, moneyFormat, translate } from 'utils'
import { ServiceTicketSection } from './style/ServiceTicketStyle'
import { BsFillCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { DetailSlider, SliderBackground, NavBackground } from './style/detailsliderstyle'
import Slider from 'react-slick'

const ServiceTicketDetail = () => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const history = useHistory()
  const params = useParams()
  const [qty, setQty] = useState(1)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { product_detail, isLoading } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Product.getProductById({ product_id: params?.id, lang: langStore?.code }))
  }, [dispatch, params?.id, langStore?.code])

  const breadcrumb_data = [
    {
      link: '/service-ticket',
      name: 'Service Ticket'
    },
    {
      name: product_detail?.data?.[0]?.name
    }
  ]

  const handleChange = (e) => {
    var value = e.target.value.replace(/[^0-9]/, "");
    value = value === "" ? 1 : value;
    value = +value;
    setQty(value);
  }

  const handleQty = (key) => () => {
    if (key === "add") {
      let num = qty;
      num += 1;
      setQty(num);
    } else {
      if (qty > 1) {
        let num = qty;
        num -= 1;
        setQty(num);
      }
    }
  }

  // add to cart 
  const handleAddToCart = async () => {
    let ticket = true
    let postData = {
      user_id: authStore?.getAuth()?.uid,
      sale_order_line: [
        {
          product_id: +params?.id,
          qty
        }
      ]
    }
    //* if you does not have uid in authStore?.getAuth(), working this function
    if (!postData?.user_id) {
      delete postData.user_id
    }
    let create_cart_res = await dispatch(addToCart(postData, langStore?.code, ticket))
    if (create_cart_res?.result?.[0]?.status === 'success') {
      history.push(
        `/service-ticket/checkout/${create_cart_res?.result[0]?.order_id}`
      )
      // console.log(`create_cart_res`, create_cart_res?.result[0]?.order_id)
    } else {
      console.log(`Ticket: add to cart error`)
    }
  }
  // end add to cart 

  let slider1 = []
  let slider2 = []

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  return (
    !isLoading &&
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <ServiceTicketSection>
        <Components.Container>
          <Components.Row>
            <Components.Col md="6">
              {/* <Components.Image src={require('../../assets/img/service-ticket-1.png').default} /> */}
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
            <Components.Col md="6">
              <Components.View as="div" className="detail-content">
                <Components.View as="div" className="desc">
                  <Components.Text as="h5">{product_detail?.data?.[0]?.name}</Components.Text>
                  <Components.Text>{product_detail?.data?.[0]?.description}</Components.Text>
                </Components.View>
                <Components.View as="div" className="price">
                  <Components.Text as="label">{translate(translation_data, 'price', langStore?.code)} :</Components.Text>
                  <Components.Text as="span" style={{color: "#FF0000"}}>
                    {
                      product_detail?.data?.[0]?.promotion?.length > 0 ?
                        <span>
                          {
                            product_detail?.data?.[0]?.list_price - ((product_detail?.data?.[0]?.promotion?.[0]?.discount_percent / 100) * product_detail?.data?.[0]?.list_price)
                          } Ks
                        </span> :
                        <span>{moneyFormat(product_detail?.data?.[0]?.list_price)} Ks</span>
                    }
                  </Components.Text>
                  {
                    product_detail?.data?.[0]?.promotion?.length > 0 &&
                    <>
                      <Components.Text as="del" size="md">{moneyFormat(product_detail?.data?.[0]?.list_price)} Ks</Components.Text>
                      <Components.Text as="span" size="md" weight="lg">{`-${product_detail?.data?.[0]?.promotion?.[0]?.discount_percent}%`}</Components.Text>
                    </>
                  }
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
                    </Components.InputGroup>
                    <Components.Button className="btn btn-default" onClick={() => handleAddToCart()}>{translate(translation_data, 'buy_now', langStore?.code)}</Components.Button>
                  </Components.View>
                </Components.Quantity>
              </Components.View>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </ServiceTicketSection>
    </>
  )
}

export default ServiceTicketDetail
