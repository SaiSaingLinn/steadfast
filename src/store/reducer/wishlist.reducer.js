import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  wishlist_data: null,
  createwishlist_data: null,
  removewishlist_data: null,
  existwishlist_data: null
}

const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case types.GETWISHLIST_REQUEST: // getWishlist
      return {
        ...state,
        isLoading: true
      }
    case types.GETWISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        wishlist_data: action.data
      }
    case types.GETWISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.CREATEWISHLIST_REQUEST: // createWishlist
      return {
        ...state,
        isLoading: true
      }
    case types.CREATEWISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createwishlist_data: action.data
      }
    case types.CREATEWISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.REMOVEWISHLIST_REQUEST: // removeWishlist
      return {
        ...state,
        isLoading: true
      }
    case types.REMOVEWISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        removewishlist_data: action.data
      }
    case types.REMOVEWISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.EXISTWISHLIST_REQUEST: // existWishlist
      return {
        ...state,
        isLoading: true
      }
    case types.EXISTWISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        existwishlist_data: action.data
      }
    case types.EXISTWISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default wishlist