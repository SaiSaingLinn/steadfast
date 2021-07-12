import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Product, Location } from 'store/actions'
import Components from 'components'
import { adsKey } from 'key'
const queryString = require('query-string')

const { product_ads } = adsKey
const scrollToRef = ref => window.scrollTo(0, ref.current?.offsetTop - 100)

const ProductList = () => {
  const history = useHistory()
  const scrollRef = useRef(null)
  const { langStore } = useSelector(state => state.translation)
  const { product_list, category_data, product_brand, isLoading } = useSelector(state => state.product)
  const { countryList_data } = useSelector(state => state.location)
  const dispatch = useDispatch()

  const [current, setCurrent] = useState(1)
  const [priceFilter, setPriceFilter] = useState({
    price: null,
    keyword: ''
  })

  const searchParam = history?.location?.search !== '' && queryString.parse(history?.location?.search)

  const categoryData = category_data?.data?.find(res => (res?.category_id === +searchParam?.category_id)) // parent category id

  const subCategData = category_data?.data?.map(category => {
    return (
      category?.sub_category?.length > 0 && category?.sub_category?.find(subCategory =>
        subCategory?.category_id === +searchParam?.subcategory_id
      )
    )
  })

  const subCategoryData = subCategData?.find(sub => sub?.category_id === +searchParam?.subcategory_id)

  useEffect(() => {
    dispatch(Product.getProductBrand({ lang: langStore?.code }))
    dispatch(Location.getCountryList({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  useEffect(() => {
    const postData = {
      page_number: current || '',
      product_per_page: 12,
      sort_by: '',
      is_ticket_product: '',
      categ_id: searchParam?.subcategory_id ? searchParam?.subcategory_id : searchParam?.category_id,
      brand_id: product_brand?.brand_id?.toString() || '',
      country_id: countryList_data?.country_id?.toString() || '',
      product_name: '',
      lang: langStore?.code,
      keywords: '',
      min_price: priceFilter?.price?.min || '',
      max_price: priceFilter?.price?.max || ''
    }

    dispatch(Product.getProduct(postData))
  }, [dispatch, current, searchParam?.category_id, searchParam?.subcategory_id, product_brand?.brand_id, countryList_data?.country_id, priceFilter?.price?.min, priceFilter?.price?.max, langStore?.code])

  const breadcrumb_data = [
    {
      name: categoryData?.category_name && categoryData?.category_name
    },
    {
      name: subCategoryData?.category_name && subCategoryData?.category_name
    }
  ]

  // console.log('product_brand', product_brand)

  const onHandleCheck = async (type, array, id) => {
    type === 'brand_id' && dispatch(Product.getCheckChange(type, array, id))
    type === 'country_id' && dispatch(Location.getCheckChange(type, array, id))
  }

  const onHandlePriceFilter = async (key, value) => {
    setPriceFilter({
      ...priceFilter,
      [key]: value
    })
  }

  const onChangePaginate = data => {
    setCurrent(data)
    scrollToRef(scrollRef)
  }

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.Col md="3">
              <Components.ProductSidebar
                sidebar_data={{ brandData: product_brand, countryData: countryList_data }}
                handleCheck={onHandleCheck}
                handleFilter={onHandlePriceFilter}
                ads_page_code={product_ads}
              />
            </Components.Col>

            <Components.Col md="9">
              <Components.Text weight="lg" size="xl" style={{ marginBottom: "15px" }}>
                {(categoryData?.category_name && subCategoryData?.category_name) ? subCategoryData?.category_name : categoryData?.category_name}
              </Components.Text>
              {!isLoading &&
                <Components.ProductCard
                  col="4"
                  product_data={product_list}
                  link='/product/detail'
                />}

              {product_list?.data?.itemcount > 12 &&
                <Components.Pagination
                  onChange={onChangePaginate}
                  current={current}
                  total={product_list?.data?.itemcount}
                  defaultPageSize={12}
                />}
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

export default ProductList