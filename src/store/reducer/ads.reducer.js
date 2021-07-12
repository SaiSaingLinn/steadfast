import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  ads_data: null
}

const ads = (state = initialState, action) => {
  switch (action.type) {
    case types.GETADS_REQUEST: // getAds
      return {
        ...state,
        isLoading: true
      }
    case types.GETADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ads_data: action.data
      }
    case types.GETADS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default ads