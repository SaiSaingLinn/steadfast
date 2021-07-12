import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const sentExpressService = data => async dispatch => { // sent express service data
  dispatch(ToDoRequest(types.SENTEXPRESSSERVICE_REQUEST))
  return await serviceController(routes.sentExpressService, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.SENTEXPRESSSERVICE_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENTEXPRESSSERVICE_ERROR, error.message)))
}

const getExpressService = params => async dispatch => { // get express service data
  dispatch(ToDoRequest(types.GETEXPRESSSERVICE_REQUEST))
  return await serviceController(`${routes.getExpressService}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETEXPRESSSERVICE_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETEXPRESSSERVICE_ERROR, error.message)))
}

const getExpressServiceType = params => async dispatch => { // get express service type data
  dispatch(ToDoRequest(types.GETEXPRESSSERVICETYPE_REQUEST))
  return await serviceController(`${routes.getExpressServiceType}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETEXPRESSSERVICETYPE_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETEXPRESSSERVICETYPE_ERROR, error.message)))
}

const sentHomeService = data => async dispatch => { // sent home service data
  dispatch(ToDoRequest(types.SENTHOMESERVICE_REQUEST))
  return await serviceController(routes.sentHomeService, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.SENTHOMESERVICE_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENTHOMESERVICE_ERROR, error.message)))
}

const getHomeService = params => async dispatch => { // get home service data
  dispatch(ToDoRequest(types.GETHOMESERVICE_REQUEST))
  return await serviceController(`${routes.getHomeService}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETHOMESERVICE_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETHOMESERVICE_ERROR, error.message)))
}

const getHomeServiceType = params => async dispatch => { // get home service type data
  dispatch(ToDoRequest(types.GETHOMESERVICETYPE_REQUEST))
  return await serviceController(`${routes.getHomeServiceType}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETHOMESERVICETYPE_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETHOMESERVICETYPE_ERROR, error.message)))
}

const getServiceLocation = params => async dispatch => { // get service location
  dispatch(ToDoRequest(types.GETSERVICELOCATION_REQUEST))
  return await serviceController(`${routes.getServiceLocation}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETSERVICELOCATION_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETSERVICELOCATION_ERROR, error.message)))
}

const getServiceSetting = params => async dispatch => { // get service settings
  dispatch(ToDoRequest(types.GETSERVICESETTING_REQUEST))
  return await serviceController(`${routes.getServiceSetting}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETSERVICESETTING_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETSERVICESETTING_ERROR, error.message)))
}

export const Services = {
  sentExpressService,
  getExpressService,
  getExpressServiceType,
  sentHomeService,
  getHomeService,
  getHomeServiceType,
  getServiceLocation,
  getServiceSetting
}