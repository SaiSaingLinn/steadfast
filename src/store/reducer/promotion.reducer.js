import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  promotion_data: null,
  promoDetail_data: null
}

const promotion = (state = initialState, action) => {
  switch (action.type) {
    case types.GETPROMOTION_REQUEST: // getPromotion
      return {
        ...state,
        isLoading: true
      }
    case types.GETPROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        promotion_data: action.data
      }
    case types.GETPROMOTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

      case types.GETPROMODETAILLIST_REQUEST: // getPromotionDetaiilList
      return {
        ...state,
        isLoading: true
      }
    case types.GETPROMODETAILLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        promoDetail_data: action.data
      }
    case types.GETPROMODETAILLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default promotion