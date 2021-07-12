import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  profile_data: null,
  updateProfile_data: null
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case types.GETPROFILE_REQUEST: // getProfile
      return {
        ...state,
        isLoading: true
      }
    case types.GETPROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile_data: action.data
      }
    case types.GETPROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.UPDATEPROFILE_REQUEST: // updateProfile
      return {
        ...state,
        isLoading: true
      }
    case types.UPDATEPROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateProfile_data: action.data
      }
    case types.UPDATEPROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'PROFILE_CLEAND_DATA':
      return {
        ...state,
        profile_data: null
      }
    default:
      return state
  }
}

export default profile