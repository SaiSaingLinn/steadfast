import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  product_list: null,
  product_detail: null,
  category_data: null,
  product_brand: null,
  checkProductQty: null
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case types.GETPRODUCT_REQUEST: // getProduct
      return {
        ...state,
        isLoading: true
      }
    case types.GETPRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product_list: action.data
      }
    case types.GETPRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETPRODUCTBYID_REQUEST: // getProductById
      return {
        ...state,
        isLoading: true
      }
    case types.GETPRODUCTBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product_detail: action.data
      }
    case types.GETPRODUCTBYID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETPRODUCTBYCATEGORY_REQUEST: // getProductByCategory
      return {
        ...state,
        isLoading: true
      }
    case types.GETPRODUCTBYCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category_data: action.data
      }
    case types.GETPRODUCTBYCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETPRODUCTBRAND_REQUEST: // getProductBrand
      return {
        ...state,
        isLoading: true
      }
    case types.GETPRODUCTBRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product_brand: action.data
      }
    case types.GETPRODUCTBRAND_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.CHECKPRODUCTQTY_REQUEST: // checkProductQty
      return {
        ...state,
        isLoading: true
      }
    case types.CHECKPRODUCTQTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        checkProductQty: action.data
      }
    case types.CHECKPRODUCTQTY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default product