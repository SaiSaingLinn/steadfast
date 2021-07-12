import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  slider_data: null
}

const getSlider = (state = initialState, action) => {
  switch (action.type) {
    case types.GETSLIDER_REQUEST: // getAboutUs
      return {
        ...state,
        isLoading: true
      }
    case types.GETSLIDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        slider_data: action.data
      }
    case types.GETSLIDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default getSlider