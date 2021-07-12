import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Components from 'components'
import { HomeContent, Promotion, websiteGallery } from 'store/actions'
import { adsKey, groupCode } from 'key'
import { translate } from 'utils/utils'

const { center_ads, home_ads, ads_slider } = adsKey

const Home = () => {
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { promotion_data } = useSelector(state => state.promotion)
  const { category_data } = useSelector(state => state.product)
  const { getLatestProduct_data, getFeaturedCategory_data, getFeaturedProduct_data } = useSelector(state => state.websiteGallery)
  const { homeContent_data } = useSelector(state => state.homecontent)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Promotion.getPromotion({ lang: langStore?.code })) // get all promotion
    dispatch(HomeContent.getHomeContent({ lang: langStore?.code })) // get home content
    dispatch(websiteGallery.getLatestProduct({ group_code: groupCode?.LATEST_PRODUCT, lang: langStore?.code }))
    dispatch(websiteGallery.getFeaturedCategory({ group_code: groupCode?.FEATURED_CATEGORY, lang: langStore?.code }))
    dispatch(websiteGallery.getFeaturedProduct({ group_code: groupCode?.FEATURED_PRODUCT, lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  const promoCardData = promotion_data?.data?.slice(0, 2) // slice promotion data

  return (
    <>
      <Components.PageBanner page_code={ads_slider} />

      {promotion_data?.data?.length > 0 && // promotion section
        <Components.Section>
          <Components.Container>
            <Components.Row>
              <Components.PromotionCard promotion_data={
                {
                  data: promoCardData
                }
              } />
            </Components.Row>
            <div className="btn-wrap">
              <Link to='/promotions' className="btn btn-white">{translate(translation_data, 'all_promotion', langStore?.code)}</Link>
            </div>
          </Components.Container>
        </Components.Section>
      }

      {getLatestProduct_data?.data?.length > 0 &&
        <Components.Section>
          <Components.Container>
            <Components.Row>
              <Components.Col lg="10" offset_lg="1">
                <Components.Title>
                  {translate(translation_data, 'latest', langStore?.code)}
                  <span> {translate(translation_data, 'products', langStore?.code)}</span>
                </Components.Title>
                <Components.Desc>
                  {getLatestProduct_data?.data?.[0]?.summary}
                </Components.Desc>
              </Components.Col>
            </Components.Row>
            <Components.ProductSlider
              product_data={getLatestProduct_data?.data}
              link="product/detail"
            />
          </Components.Container>
        </Components.Section>
      }


      <Components.Advertisement position_code={center_ads} page_code={home_ads} />

      {category_data?.data?.length > 0 &&
        <Components.Section className="category-section">
          <Components.Container>
            <Components.Row>
              <Components.Col lg="10" offset_lg="1">
                <Components.Title>{translate(translation_data, 'categories', langStore?.code)}</Components.Title>
              </Components.Col>
            </Components.Row>
            <Components.CategoryCard categ_data={getFeaturedCategory_data?.data} link='/' />
          </Components.Container>
        </Components.Section>
      }

      {/* Service Card  */}
      {homeContent_data?.data &&
        <Components.Section>
          <Components.Container>
            <Components.ServiceCard homeContent_data={homeContent_data} />
          </Components.Container>
        </Components.Section>
      }

      {/* product card without slider  */}
      {getFeaturedProduct_data?.data?.length > 0 &&
        <Components.Section>
          <Components.Container>
            <Components.Row>
              <Components.Col lg="10" offset_lg="1">
                <Components.Title>
                  {translate(translation_data, 'featured', langStore?.code)}
                  <span> {translate(translation_data, 'products', langStore?.code)}</span>
                </Components.Title>
                <Components.Desc>{getFeaturedProduct_data?.data?.[0]?.summary}</Components.Desc>
              </Components.Col>
            </Components.Row>
            <Components.ProductCard
              product_data={{
                data: {
                  product_list: getFeaturedProduct_data?.data
                }
              }}
              isHome={true}
              link="product/detail"
              col="3" />
          </Components.Container>
        </Components.Section>
      }
    </>
  )
}

export default Home