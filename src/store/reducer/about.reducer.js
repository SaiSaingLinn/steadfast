import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  about_data: null
}

const about = (state = initialState, action) => {
  switch (action.type) {
    case types.GETABOUTUS_REQUEST: // getAboutUs
      return {
        ...state,
        isLoading: true
      }
    case types.GETABOUTUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        about_data: action.data
      }
    case types.GETABOUTUS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default about