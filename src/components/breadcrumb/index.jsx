import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from '../core'
import { BreadcrumbSection } from './style/BreadcrumbStyle'
import Media from 'react-media'
import { useSelector } from 'react-redux'
import { translate } from 'utils'

const Breadcrumb = ({ home, data }) => {
  const { translation_data, langStore } = useSelector(state => state.translation)

  return (
    <Media query="(min-width: 768px)" render={() => (
      <BreadcrumbSection>
        <Container>
          <Row>
            <Col space="12">
              <ul>
                <li>
                  <Link to="/">{translate(translation_data, 'home', langStore?.code)}</Link>
                </li>
                {data?.length > 0 &&
                  data.map((item, key) =>
                    item?.name &&
                    <li key={key}>
                      {item?.link ? <Link to={item?.link}>{item?.name}</Link> : <span>{item?.name}</span>}
                    </li>
                  )
                }
              </ul>
            </Col>
          </Row>
        </Container>
      </BreadcrumbSection>
    )} />
  )
}

export default Breadcrumb
