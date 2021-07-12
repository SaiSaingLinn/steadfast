import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  meta_data: null
}

const metaData = (state = initialState, action) => {
  switch (action.type) {
    case types.GETMETADATA_REQUEST: // getMetaData
      return {
        ...state,
        isLoading: true
      }
    case types.GETMETADATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meta_data: action.data
      }
    case types.GETMETADATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default metaData