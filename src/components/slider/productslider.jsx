import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '../core'
import { SliderContainer, sliderSettings } from './style/sliderstyle'
import { CardDiv, BackgroundImage } from '../card/style/cardstyle'
import { Col } from '../../components'
import { moneyFormat } from 'utils'

const ProductSlider = ({ product_data, link }) => {
  const tmpData = {
    ...sliderSettings,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: (product_data?.length > 4) ? true : false,
    autoplay: true,
    dots: false
  }

  return (
    <ProductSliderStyled>
      <Slider {...tmpData} className="slider-row">
        {product_data?.length > 0 &&
          product_data?.map(product => (
            <Col key={product?.product_id}>
              <Link to={(!product?.is_ticket_product) ? `${link}/${product?.product_id}` : `service-ticket/detail/${product?.product_id}`}>
                <CardDiv className={!product?.is_ticket_product && product?.status} out_of_stock={!product?.is_ticket_product && 'out of stock'} product>
                  <div className="card-wrap">
                    <BackgroundImage data={product?.product_image || require('../../assets/img/no-img.jpg').default} />
                    {product?.promotion?.length > 0 && <span className="promo">{`-${product?.promotion?.[0]?.discount_percent}%`}</span>}
                    <div className="content">
                      <Text weight="lg" className="product-name">{product?.name}</Text>
                      <div className="price">
                        {
                          product?.promotion?.length > 0 ?
                            <span>
                              {
                                product?.list_price - ((product?.promotion?.[0]?.discount_percent / 100) * product?.list_price)
                              } Ks
                            </span> :
                            <span>{moneyFormat(product?.list_price)} Ks</span>
                        }
                        {product?.promotion?.length > 0 && <del>{moneyFormat(product?.list_price)} Ks</del>}
                      </div>
                    </div>
                  </div>
                </CardDiv>
              </Link>
            </Col>
          ))
        }
      </Slider>
    </ProductSliderStyled>
  )
}

export default ProductSlider

const ProductSliderStyled = styled(SliderContainer)`
  .slick-arrow {
    top: 50%;
    bottom: initial;
    transform: translateY(-50%);
  }
  .slider-row {
    margin-left: -15px;
    margin-right: -15px;
  }
  .slick-slide {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`