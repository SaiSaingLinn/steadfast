import React from 'react'
import Media from 'react-media'
import CustomPlaceholder from '../fakeimg'
import { Section, Container, Row, Col } from 'components'
import colors from '../constant/Color'

const TopAds = props => {
  const { ads_data } = props

  const tmp = {
    height: 250,
    backgroundColor: colors.light,
    text: 'ADS - 1170 x 250'
  }

  return (
    <Section className="center-ads" style={{ padding: 0 }}>
      <Container>
        <Row>
          <Col space="12">
            <a href={(ads_data?.data?.[0]?.advertising_image && ads_data?.data?.[0]?.url_link) || '#/'} target={ads_data?.data?.[0]?.advertising_image && '_blank'} rel="noopener noreferrer" alt="Advertisement">
              <Media queries={{
                spView: '(max-width: 767px)',
                dskView: '(min-width: 768px)'
              }}>
                {matches => (
                  <>
                    {matches.dskView && <CustomPlaceholder data={ads_data?.data?.[0]?.advertising_image} {...tmp} />}
                    {matches.spView && <CustomPlaceholder data={ads_data?.data?.[0]?.adv_image_mobile} {...tmp} />}
                  </>
                )}
              </Media>
            </a>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default TopAds
