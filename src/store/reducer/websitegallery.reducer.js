import * as types from 'store/types'

const initialState = {
  error: null,
  isLoading: false,
  getLatestProduct_data: null,
  getFeaturedCategory_data: null,
  getFeaturedProduct_data: null
}

const websiteGallery = (state = initialState, action) => {
  switch (action.type) {
    case types.GETLATESTPRODUCT_REQUEST: // getLatestProduct
      return {
        ...state,
        isLoading: true
      }
    case types.GETLATESTPRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getLatestProduct_data: action.data
      }
    case types.GETLATESTPRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETFEATUREDCATEGORY_REQUEST: // getFeaturedCategory
      return {
        ...state,
        isLoading: true
      }
    case types.GETFEATUREDCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getFeaturedCategory_data: action.data
      }
    case types.GETFEATUREDCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETfEATUREDPRODUCT_REQUEST: // getFeaturedProdduct
      return {
        ...state,
        isLoading: true
      }
    case types.GETfEATUREDPRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getFeaturedProduct_data: action.data
      }
    case types.GETfEATUREDPRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default websiteGallery