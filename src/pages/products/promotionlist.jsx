import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Components, { fontSize, fontWeight } from 'components'
import media from 'components/constant/Media'
import { useDispatch, useSelector } from 'react-redux'
import { Promotion } from 'store/actions'
import { useParams } from 'react-router-dom'

const scrollToRef = ref => window.scrollTo(0, ref.current?.offsetTop - 100)

const PromoList = () => {
  const param = useParams()
  const scrollRef = useRef(null)
  const [current, setCurrent] = useState(1)
  const { langStore } = useSelector(state => state.translation)
  const { promoDetail_data, isLoading } = useSelector(state => state.promotion)
  const dispatch = useDispatch()

  useEffect(() => {
    const postData = {
      page_number: current || '',
      product_per_page: 12,
      sort_by: '',
      categ_id: '',
      brand_id: '',
      product_name: '',
      lang: langStore?.code,
      keywords: '',
      promotion_listing_id: param?.id
    }
    dispatch(Promotion.getPromoDetailList(postData))
  }, [dispatch, current, langStore?.code, param?.id])

  const breadcrumb_data = [
    {
      name: 'Promotions',
      link: '/promotions'
    },
    {
      name: promoDetail_data?.data?.product_list?.[0]?.promotion?.[0]?.name
    }
  ]

  const onChangePaginate = data => {
    setCurrent(data)
    scrollToRef(scrollRef)
  }

  return (
    !isLoading &&
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.Col space="12">
              <PromoWrap as="div">
                <Components.Text as="h5">
                  {promoDetail_data?.data?.product_list?.[0]?.promotion?.[0]?.name}
                </Components.Text>
                <Components.Text>
                  {promoDetail_data?.data?.product_list?.[0]?.promotion?.[0]?.description}
                </Components.Text>
              </PromoWrap>
            </Components.Col>
            <Components.Col space="12">
              <Components.ProductCard
                product_data={promoDetail_data}
                link="/product/detail" col="3" />

              {promoDetail_data?.data?.itemcount > 12 &&
                <Components.Pagination
                  onChange={onChangePaginate}
                  current={current}
                  total={promoDetail_data?.data?.itemcount}
                  defaultPageSize={12}
                />}
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

const PromoWrap = styled(Components.View)`
  > * {
    margin-bottom: 20px;
  }
  h5 {
    font-size: ${fontSize.lg}px;
    font-weight: ${fontWeight.lg};
    @media screen and (min-width: ${media.md}px) {
      font-size: ${fontSize.xl}px;
    }
  }
`

export default PromoList
