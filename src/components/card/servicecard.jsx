import React from 'react'
import { ServiceBgImg, ServiceCardWrap } from './style/cardstyle'
import { Link } from 'react-router-dom'
import { Row, Col, Text } from 'components'
import { useSelector } from 'react-redux'
import { translate } from 'utils'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const ServiceCard = ({ homeContent_data }) => {
  const { translation_data, langStore } = useSelector(state => state.translation)

  return (
    <ServiceCardWrap>
      <Row>
        <Col lg="4" md="6" className="service-card-col">
          <div className="service-bg-color">
            <div className="service-wrap">
              <div className="service-img">
                <ServiceBgImg data={homeContent_data?.data?.card_1_image || require('../../assets/img/no-img.jpg').default} title={homeContent_data?.data?.card_1_title} className="service-bg-img" />
              </div>
              <div className="service-desc">
                <Text className="name">{homeContent_data?.data?.card_1_title}</Text>
                {/* <Text className="desc" dangerouslySetInnerHTML={{ __html: homeContent_data?.data?.card_1_summary }} /> */}
                <HTMLEllipsis
                  unsafeHTML={homeContent_data?.data?.card_1_summary}
                  maxLine='4'
                  ellipsis='...'
                  basedOn='letters'
                  className="desc ticket-desc"
                />
                <Link to={homeContent_data?.data?.card_1_link ? homeContent_data?.data?.card_1_link : ''} className="btn btn-white">
                  {translate(translation_data, 'explore_more', langStore?.code)}
                </Link>
              </div>
            </div>
          </div>
        </Col>

        <Col lg="4" md="6" className="service-card-col">
          <div className="service-bg-color">
            <div className="service-wrap">
              <div className="service-img">
                <ServiceBgImg data={homeContent_data?.data?.card_2_image || require('../../assets/img/no-img.jpg').default} title={homeContent_data?.data?.card_2_title} className="service-bg-img" />
              </div>
              <div className="service-desc">
                <Text className="name">{homeContent_data?.data?.card_2_title}</Text>
                {/* <Text className="desc" dangerouslySetInnerHTML={{ __html: homeContent_data?.data?.card_2_summary }} /> */}
                <HTMLEllipsis
                  unsafeHTML={homeContent_data?.data?.card_2_summary}
                  maxLine='4'
                  ellipsis='...'
                  basedOn='letters'
                  className="desc ticket-desc"
                />
                <Link to={homeContent_data?.data?.card_2_link ? homeContent_data?.data?.card_2_link : ''} className="btn btn-white">
                  {translate(translation_data, 'explore_more', langStore?.code)}
                </Link>
              </div>
            </div>
          </div>
        </Col>

        <Col lg="4" md="6" className="service-card-col">
          <div className="service-bg-color">
            <div className="service-wrap">
              <div className="service-img">
                <ServiceBgImg data={homeContent_data?.data?.card_3_image || require('../../assets/img/no-img.jpg').default} title={homeContent_data?.data?.card_3_title} className="service-bg-img" />
              </div>
              <div className="service-desc">
                <Text className="name">{homeContent_data?.data?.card_3_title}</Text>
                {/* <Text className="desc" dangerouslySetInnerHTML={{ __html: homeContent_data?.data?.card_3_summary }} /> */}
                <HTMLEllipsis
                  unsafeHTML={homeContent_data?.data?.card_3_summary}
                  maxLine='4'
                  ellipsis='...'
                  basedOn='letters'
                  className="desc"
                />
                <Link to={homeContent_data?.data?.card_3_link ? homeContent_data?.data?.card_3_link : ''} className="btn btn-white">
                  {translate(translation_data, 'explore_more', langStore?.code)}
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </ServiceCardWrap>
  )
}

export default ServiceCard