import React from 'react'
import { PromoBgImg, CardDiv } from './style/cardstyle'
import { Link } from 'react-router-dom'
import { Col, Text } from 'components'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const PromotionCard = ({ promotion_data }) => {

  return (
    promotion_data?.data?.length > 0 &&
    promotion_data?.data?.map(promo =>
      <Col lg="6" style={{ marginBottom: 15 }} key={promo?.id}>
        <CardDiv>
          <Link to={`/promotions/product-list/${promo?.id}`} className="card-wrap promo-card">
            <div className="promo-text">
              <Text className="title" weight="lg">{promo?.name}</Text>
              <Text className="percent" weight="xl" size="xl">{promo?.percent}</Text>
              {/* <Text className="desc">{promo?.description}</Text> */}
              <HTMLEllipsis
                unsafeHTML={promo?.description}
                maxLine='3'
                ellipsis='...'
                basedOn='letters'
                className="desc promo-desc"
              />
            </div>
            <PromoBgImg data={promo?.image || require('../../assets/img/no-img.jpg').default} title={promo?.name} />
          </Link>
        </CardDiv>
      </Col>
    )
  )
}

export default PromotionCard