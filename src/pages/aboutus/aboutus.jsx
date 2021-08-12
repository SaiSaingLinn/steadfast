import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { about } from 'store/actions'
import Components, { Container, Row, Col, Text, Image } from 'components'
import { About } from './style/aboutstyle'
import { translate } from 'utils'


const AboutUs = () => {
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { about_data } = useSelector(state => state.about)
  const dispatch = useDispatch()

  const breadcrumb_data = [{ name: translate(translation_data, 'about_us', langStore?.code) }]

  useEffect(() => {
    dispatch(about.getAbout({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Container>
          <Row>
            <Col sm="5">
              <Image src={about_data?.data?.[0]?.aboutus_image} alt={about_data?.data[0]?.aboutus_name} />
            </Col>
            <Col sm="7">
              <About>
                <Text size="xl" weight="lg" className="title">
                  {about_data?.data?.[0]?.aboutus_name}
                </Text>
                <Text dangerouslySetInnerHTML={{ __html: about_data?.data?.[0]?.aboutus_description }} />
                <p>github</p>
              </About>
            </Col>
          </Row>
        </Container>
      </Components.Section>
    </>
  )
}

export default AboutUs
