import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  cityList_data: null,
  countryList_data: null
}

const cityList = (state = initialState, action) => {
  switch (action.type) {
    case types.GETCITYLIST_REQUEST: // GETCITYLIST
      return {
        ...state,
        isLoading: true
      }
    case types.GETCITYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cityList_data: action.data
      }
    case types.GETCITYLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETCOUNTRYLIST_REQUEST: // getCountryList
      return {
        ...state,
        isLoading: true
      }
    case types.GETCOUNTRYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countryList_data: action.data
      }
    case types.GETCOUNTRYLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default cityList