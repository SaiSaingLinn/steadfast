import * as types from '../types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter, checkChange, getCheckId } from 'utils'

const getProduct = params => async dispatch => {
  // console.log(routeFilter(params))
  dispatch(ToDoRequest(types.GETPRODUCT_REQUEST))
  return await serviceController(`${routes.getProduct}?${routeFilter(params)}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPRODUCT_SUCCESS, res.data))
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPRODUCT_ERROR, error.message)))
}

const getProductById = params => async dispatch => {
  dispatch(ToDoRequest(types.GETPRODUCTBYID_REQUEST))
  return await serviceController(`${routes.getProductById}?${routeFilter(params)}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPRODUCTBYID_SUCCESS, res.data))
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPRODUCTBYID_ERROR, error.message)))
}

const getProductCategory = params => async dispatch => {
  dispatch(ToDoRequest(types.GETPRODUCTBYCATEGORY_REQUEST))
  return await serviceController(`${routes.getProductByCategory}?${routeFilter(params)}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPRODUCTBYCATEGORY_SUCCESS, res.data))
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPRODUCTBYCATEGORY_ERROR, error.message)))
}

const getProductFilter = (array, id, selectIndex) => async dispatch => {
  let tmp = array
  if (tmp?.data?.length > 0) {
    tmp?.data?.map(x => {
      if (x?.sub_category?.length > 0) {
        let new_res = x?.sub_category?.filter(y => y.category_id === id)
        if (new_res?.length > 0) {
          let new_breadcrumb = {
            ...x,
            selectIndex,
            sub_category: new_res
          }
          delete tmp.breadcrumbData
          tmp.breadcrumbData = new_breadcrumb
          return true
        }
      } else {
        let new_res = tmp?.data?.filter(y => y?.category_id === id)
        if (new_res?.length > 0) {
          delete tmp.breadcrumbData
          tmp.breadcrumbData = {
            ...new_res[0],
            selectIndex
          }
          return true
        }
      }
    })
    dispatch(ToDoSuccess(types.GETPRODUCTBYCATEGORY_SUCCESS, tmp))
  }
}

// product brand
const getProductBrand = params => async dispatch => {
  dispatch(ToDoRequest(types.GETPRODUCTBRAND_REQUEST))
  return await serviceController(`${routes.getProductBrand}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPRODUCTBRAND_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPRODUCTBRAND_ERROR, error.message)))
}

// check change
const getCheckChange = (type, array, id) => async dispatch => {
  let res = await checkChange(type, array, id)
  let id_res = await getCheckId(type, res)

  let data = {
    count: res?.length,
    brand_id: id_res,
    data: res
  }
  dispatch(ToDoSuccess(types.GETPRODUCTBRAND_SUCCESS, data))
}

// product qty
const checkProductQty = (product_id, variant_id, qty) => async dispatch => {
  dispatch(ToDoRequest(types.CHECKPRODUCTQTY_REQUEST))
  return await serviceController(`${routes.checkProductQty}?product_id=${product_id}&variant_id=${variant_id}&qty=${qty}`)
    .then(async res => {
      if (res.data) {
        // if (product_detail) {
        //   let calc_data = productPromo(product_detail, qty, lang)
        //   dispatch(ToDoSuccess(types.GETPRODUCTBYID_SUCCESS, calc_data))
        // }
        dispatch(ToDoSuccess(types.CHECKPRODUCTQTY_SUCCESS, res.data))
      } else {
        console.log(res.data)
      }
    })
    .catch(error => dispatch(ToDoError(types.CHECKPRODUCTQTY_ERROR, error.message)))
}

export const Product = {
  getProduct,
  getProductById,
  getProductCategory,
  getProductBrand,
  getProductFilter,
  getCheckChange,
  checkProductQty
}