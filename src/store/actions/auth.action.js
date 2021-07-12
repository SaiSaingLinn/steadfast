import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { authStore } from '../../service'

const signUp = data => async dispatch => {
  dispatch(ToDoRequest(types.SENDSIGNUP_REQUEST))
  return await serviceController(routes.signUp, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.SENDSIGNUP_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENDSIGNUP_ERROR, error.message)))
}

const signIn = data => async dispatch => {
  dispatch(ToDoRequest(types.SENDSIGNIN_REQUEST))
  return await serviceController(routes.signIn, data)
    .then(res => {
      if (res?.data) {
        dispatch(ToDoSuccess(types.SENDSIGNIN_SUCCESS, res.data))
        authStore.setAuth(res.data)
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENDSIGNIN_ERROR, error.message)))
}

const userOtp = data => async dispatch => {
  dispatch(ToDoRequest(types.SENDOTP_REQUEST))
  return await serviceController(routes.userOtp, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.SENDOTP_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENDOTP_ERROR, error.message)))
}

const userCheck = data => async dispatch => {
  dispatch(ToDoRequest(types.USERCHECK_REQUEST))
  return await serviceController(routes.resendOtp, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.USERCHECK_SUCCESS, res.data))
        return res.data.result
      } else {
        return res.data.result
      }
    })
    .catch(error => dispatch(ToDoError(types.USERCHECK_ERROR, error.message)))
}

const resetPassword = data => async dispatch => {
  dispatch(ToDoRequest(types.RESETPASSWORD_REQUEST))
  return await serviceController(routes.resetPassword, data)
    .then(res => {
      if (res?.data?.result?.status === 'success') {
        dispatch(ToDoSuccess(types.RESETPASSWORD_SUCCESS, res.data))
        return res.data.result
      } else {
        return res.data.result
      }
    })
    .catch(error => dispatch(ToDoError(types.RESETPASSWORD_ERROR, error.message)))
}

const changePassword = data => async dispatch => {
  dispatch(ToDoRequest(types.CHANGEPASSWORD_REQUEST))
  return await serviceController(routes.changePassword, data)
    .then(res => {
      if (res?.data?.result?.status === 'success') {
        dispatch(ToDoSuccess(types.CHANGEPASSWORD_SUCCESS, res.data))
        return res.data.result
      } else {
        return res.data.result
      }
    })
    .catch(error => dispatch(ToDoError(types.CHANGEPASSWORD_ERROR, error.message)))
}

const signOut = () => async dispatch => {
  dispatch(ToDoSuccess(types.SENDSIGNIN_SUCCESS, null))
  authStore.removeAuth()
}

export const auth = {
  signIn,
  signUp,
  userOtp,
  userCheck,
  resetPassword,
  changePassword,
  signOut
}