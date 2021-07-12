import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { authStore } from "../../service";

const getProfile = (customer_id) => async dispatch => {
  dispatch(ToDoRequest(types.GETPROFILE_REQUEST))
  return await serviceController(`${routes.getProfile}?customer_id=${customer_id}`)
    .then(res => {
      if (res?.data?.data?.status === "fail") {
        authStore.removeAuth();
        dispatch(ToDoError(types.GETPROFILE_ERROR, res?.data))
      } else {
        dispatch(ToDoSuccess(types.GETPROFILE_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPROFILE_ERROR, error.message)))
}

const updateProfile = data => async dispatch => {
  dispatch(ToDoRequest(types.UPDATEPROFILE_REQUEST))
  return await serviceController(routes.updateProfile, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.UPDATEPROFILE_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.UPDATEPROFILE_ERROR, error.message)))
}

const cleanData = (type, data) => {
  return ({
    type,
    data
  })
}

export const profile = {
  getProfile,
  updateProfile,
  cleanData
}