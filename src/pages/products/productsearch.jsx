import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Components from 'components'
import { Product, Location } from 'store/actions'
import { translate } from 'utils/utils'
const queryString = require('query-string')

const scrollToRef = ref => window.scrollTo(0, ref.current?.offsetTop - 100)

const ProductSearch = () => {
  const location = useLocation()
  const scrollRef = useRef(null)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { isLoading, product_list, product_brand, category_data } = useSelector(state => state.product)
  const { countryList_data } = useSelector(state => state.location)
  const dispatch = useDispatch()

  const [current, setCurrent] = useState(1)
  const [priceFilter, setPriceFilter] = useState({
    price: null,
    keyword: ''
  })

  const product_key = queryString.parse(location.search)

  const category_ids = [] // get all category_id and subcategory_id
  category_data?.data?.map(category => (
    category_ids.push({
      categ_id: category?.category_id,
      subcateg_id: category?.sub_category?.map(subcategory => subcategory?.category_id)
    })
  ))

  console.log(category_ids)

  // const sellerCats = [
  //   {
  //     "Cid": 1284805663,
  //     "Name": "PARENT CATEGORY",
  //     "ParentCid": 0,
  //     "PicUrl": "",
  //     "SortOrder": 1,
  //     "Type": "manual_type"
  //   },
  //   {
  //     "Cid": 1284805664,
  //     "Name": "CHILD CATEGORY",
  //     "ParentCid": 1284805663,
  //     "PicUrl": "",
  //     "SortOrder": 1,
  //     "Type": "manual_type"
  //   }
  // ]

  // let childMap = { 0: [] }
  // let root = { Cid: 0, nodes: childMap[0] }
  // for (let i = 0; i < sellerCats.length; i++) {
  //   let category = sellerCats[i]
  //   childMap[category.Cid] = childMap[category.Cid] || []
  //   childMap[category.ParentCid] = childMap[category.ParentCid] || []
  //   category.nodes = childMap[category.Cid]
  //   childMap[category.ParentCid].push(category)
  // }

  // console.log(childMap)

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
      categ_id: '',
      brand_id: product_brand?.brand_id?.toString() || '',
      country_id: countryList_data?.country_id?.toString() || '',
      product_name: '',
      lang: langStore?.code,
      keywords: product_key?.key,
      min_price: priceFilter?.price?.min || '',
      max_price: priceFilter?.price?.max || ''
    }

    dispatch(Product.getProduct(postData))
  }, [dispatch, current, product_key?.key, product_brand?.brand_id, countryList_data?.country_id, priceFilter?.price?.min, priceFilter?.price?.max, langStore?.code, priceFilter?.price?.min, priceFilter?.price?.max])

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
    <Components.Section>
      <Components.Container>
        <Components.Row>
          <Components.Col md="3">
            <Components.ProductSidebar
              sidebar_data={{ brandData: product_brand, countryData: countryList_data }}
              handleCheck={onHandleCheck}
              handleFilter={onHandlePriceFilter}
            />
          </Components.Col>
          <Components.Col lg='9' md='9'>
            <SearchTitle as='h5' cu_size='24' cu_weight='500'>
              <span>{translate(translation_data, 'search_result', langStore?.code)} </span>
              <span>"{product_key?.key === '' ? ' ' : product_key?.key}" — </span>
              <span> {`${product_list?.data?.itemcount !== 0 ? `(${product_list?.data?.itemcount})` : ' '}`} </span>
              <span>
                {product_list?.data?.itemcount !== 0 ?
                  translate(translation_data, 'result_found', langStore?.code) :
                  translate(translation_data, 'no_result_found', langStore?.code)
                }
              </span>
            </SearchTitle>
            {!isLoading &&
              <Components.ProductCard
                col='4'
                product_data={product_list}
                category_ids={category_ids}
                link={`/product/detail`}
              />
            }

            {product_list?.itemcount > 12 && <Components.Pagination
              onChange={onChangePaginate}
              current={current}
              total={product_list?.itemcount}
              defaultPageSize={12}
            />}
          </Components.Col>
        </Components.Row>
      </Components.Container>
    </Components.Section>
  )
}

export default ProductSearch

// styled
const SearchTitle = styled(Components.Text)`
  margin-bottom: 30px;
`