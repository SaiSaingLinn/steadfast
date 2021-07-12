import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CardDiv, BackgroundImage, ProductCardWrap } from '../card/style/cardstyle'
import Components, { Row, Col } from 'components'
import { translate, moneyFormat } from 'utils/utils'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const ProductCard = ({ product_data, link, isHome, col }) => {
  const { translation_data, langStore } = useSelector(state => state.translation)
  // console.log("product_data", product_data)
  return (
    product_data !== null &&
    <ProductCardWrap>
      <Row>
        {product_data?.data?.product_list?.length > 0 ?
          product_data?.data?.product_list?.map(list => (
            <Col md={col} className="product-col" key={list?.product_id}>
              <Link to={(!list?.is_ticket_product) ? `${link}/${list?.product_id}` : `service-ticket/detail/${list?.product_id}`}>
                <CardDiv className={!list?.is_ticket_product && list?.status} out_of_stock={!list?.is_ticket_product && 'out of stock'} product>
                  <div className="card-wrap">
                    <BackgroundImage data={list?.product_image || require('../../assets/img/no-img.jpg').default} />
                    {list?.promotion?.length > 0 && <span className="promo">{`-${list?.promotion?.[0]?.discount_percent}%`}</span>}
                    <div className="content">
                      <HTMLEllipsis
                        unsafeHTML={list?.name}
                        maxLine='3'
                        ellipsis='...'
                        basedOn='letters'
                        className="product-name"
                      />
                      {/* <Text weight="lg" className="product-name">{list?.name}</Text> */}
                      <div className="price">
                        {
                          list?.promotion?.length > 0 ?
                            <span>
                              {
                                list?.list_price - ((list?.promotion?.[0]?.discount_percent / 100) * list?.list_price)
                              } Ks
                            </span> :
                            <span>{moneyFormat(list?.list_price)} Ks</span>
                        }
                        {list?.promotion?.length > 0 && <del>{moneyFormat(list?.list_price)} Ks</del>}
                      </div>
                    </div>
                  </div>
                </CardDiv>
              </Link>
            </Col>
          ))
          :
          !isHome ? <Components.NoResult result={translate(translation_data, 'no_result_found', langStore?.code)} /> : ''
        }
      </Row>
    </ProductCardWrap>
  )
}

export default ProductCard