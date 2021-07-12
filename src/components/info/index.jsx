import React from 'react'
import styled from 'styled-components'
import colors from '../../components/constant/Color'
import { Section, Container, Row, Col, Text } from '../../components'

const Support = ({ support_data }) => {
  return (
    <SupportSection>
      <Container>
        <Row>
          <Col lg="3" md="6">
            <div className="support-wrap">
              <div className="support-img">
                <img src={support_data?.data?.shipping?.image} alt={support_data?.data?.shipping?.code} />
              </div>
              <div className="support-desc">
                <Text weight="xl" size="md">
                  {support_data?.data?.shipping?.name}
                </Text>
                <Text className="desc">
                  {support_data?.data?.shipping?.text_one}
                </Text>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6">
            <div className="support-wrap">
              <div className="support-img">
                <img src={support_data?.data?.support?.image} alt={support_data?.data?.support?.code} />
              </div>
              <div className="support-desc">
                <Text weight="xl" size="md">
                  {support_data?.data?.support?.name}
                </Text>
                <Text className="desc">
                  {support_data?.data?.support?.text_one}
                </Text>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6">
          <div className="support-wrap">
              <div className="support-img">
                <img src={support_data?.data?.safety?.image} alt={support_data?.data?.safety?.code} />
              </div>
              <div className="support-desc">
                <Text weight="xl" size="md">
                  {support_data?.data?.safety?.name}
                </Text>
                <Text className="desc">
                  {support_data?.data?.safety?.text_one}
                </Text>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6">
          <div className="support-wrap">
              <div className="support-img">
                <img src={support_data?.data?.offer?.image} alt={support_data?.data?.offer?.code} />
              </div>
              <div className="support-desc">
                <Text weight="xl" size="md">
                  {support_data?.data?.offer?.name}
                </Text>
                <Text className="desc">
                  {support_data?.data?.offer?.text_one}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </SupportSection>
  )
}

const SupportSection = styled(Section)`
  background: ${colors.white};
  .support-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media screen and (max-width: 767px) {
      margin-bottom: 15px;
    }
    .support-img {
      margin-right: 15px;
    }
    .support-desc {
      .desc {
        margin-top: 10px;
        color: ${colors.muted};
      }
    }
  }
`

export default Support
