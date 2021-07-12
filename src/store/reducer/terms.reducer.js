import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  webSiteInfo_data: null
}

const terms = (state = initialState, action) => {
  switch (action.type) {
    case types.GETWEBSITEINFO_REQUEST: // getTermsCondition
      return {
        ...state,
        isLoading: true
      }
    case types.GETWEBSITEINFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        webSiteInfo_data: action.data
      }
    case types.GETWEBSITEINFO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default terms