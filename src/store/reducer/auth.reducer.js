import * as types from '../types'
import { authStore } from '../../service'

const initialState = {
  error: null,
  isLoading: false,
  sentSignIn_data: authStore.getAuth() || null,
  sentSignUp_data: null,
  resetPassword_data: null,
  changePassword_data: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SENDSIGNIN_REQUEST: // SENDSIGNIN
      return {
        ...state,
        isLoading: true
      }
    case types.SENDSIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentSignIn_data: action.data
      }
    case types.SENDSIGNIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.SENDSIGNUP_REQUEST: // SENDSIGNUP
      return {
        ...state,
        isLoading: true
      }
    case types.SENDSIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentSignUp_data: action.data
      }
    case types.SENDSIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.RESETPASSWORD_REQUEST: // RESETPASSWORD
      return {
        ...state,
        isLoading: true
      }
    case types.RESETPASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resetPassword_data: action.data
      }
    case types.RESETPASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.CHANGEPASSWORD_REQUEST: // CHANGEPASSWORD
      return {
        ...state,
        isLoading: true
      }
    case types.CHANGEPASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        changePassword_data: action.data
      }
    case types.CHANGEPASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default auth