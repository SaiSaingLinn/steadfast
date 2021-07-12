import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { HomeContent, Product } from 'store/actions'
import { translate } from 'utils/utils'
import Components from 'components'
import { adsKey } from 'key'
import { ServiceTicketSection, ServiceCard, ServiceBgImage } from './style/ServiceTicketStyle'

const { center_ads, service_ticket_ads, service_ticket } = adsKey


const Ticket = () => {
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { product_list, isLoading } = useSelector(state => state.product)
  const { homeContent_data } = useSelector(state => state.homecontent)

  const dispatch = useDispatch()

  const breadcrumb_data = [{ name: translate(translation_data, 'service_ticket', langStore?.code) }]

  useEffect(() => {
    const postData = {
      page_number: '',
      product_per_page: 12,
      sort_by: '',
      is_ticket_product: true,
      categ_id: '',
      brand_id: '',
      country_id: '',
      product_name: '',
      lang: langStore?.code,
      keywords: '',
      min_price: '',
      max_price: ''
    }
    dispatch(Product.getProduct(postData))
    dispatch(HomeContent.getHomeContent({ lang: langStore?.code })) // get home content
  }, [dispatch, langStore?.code])

  return (
    !isLoading &&
    <>
      <Components.PageBanner page_code={service_ticket} />

      <Components.Breadcrumb data={breadcrumb_data} />

      <Components.Advertisement position_code={center_ads} page_code={service_ticket_ads} />

      <ServiceTicketSection>
        <ServiceBgImage data={require('../../assets/img/service-ticket-bg.png').default} section_bg={true}>
          <Components.Container>
            <Components.Row>
              <Components.Col space="12">
                <Components.View as="div" className="service-ticket-wrap">
                  <Components.Text className="service-title">
                    {homeContent_data?.data?.card_1_title}
                  </Components.Text>
                  <Components.Text
                    dangerouslySetInnerHTML={{ __html: homeContent_data?.data?.card_1_description }}
                  />
                </Components.View>
              </Components.Col>
              {product_list?.data?.product_list?.length > 0 &&
                product_list?.data?.product_list?.map(product => (
                  <Components.Col md="6" key={product?.product_id}>
                    <ServiceCard>
                      <Link to={`/service-ticket/detail/${product?.product_id}`}>
                        <Components.View as="div" className="card-img">
                          <ServiceBgImage data={product?.product_image || require('../../assets/img/no-img.jpg').default} />
                        </Components.View>
                        <Components.View as="div" className="card-content">
                          <Components.Text as="h5">
                            {product?.name}
                          </Components.Text>
                          <HTMLEllipsis
                            unsafeHTML={product?.description}
                            maxLine='5'
                            ellipsis='...'
                            basedOn='letters'
                          />
                        </Components.View>
                      </Link>
                    </ServiceCard>
                  </Components.Col>
                ))
              }
            </Components.Row>
          </Components.Container>
        </ServiceBgImage>
      </ServiceTicketSection>
    </>
  )
}

export default Ticket
