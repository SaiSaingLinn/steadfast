import * as types from 'store/types'

const initialState = {
  error: null,
  isLoading: false,
  homeContent_data: null
}

const homeContent = (state = initialState, action) => {
  switch (action.type) {
    case types.GETHOMECONTENT_REQUEST: // homePageContent
      return {
        ...state,
        isLoading: true
      }
    case types.GETHOMECONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeContent_data: action.data
      }
    case types.GETHOMECONTENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default homeContent