import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from '../../utils'

const getContactUs = params => async dispatch => {
  dispatch(ToDoRequest(types.GETCONTACTUS_REQUEST))
  return await serviceController(`${routes.getContact}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETCONTACTUS_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETCONTACTUS_ERROR, error.message)))
}

const sentContactUs = data => async dispatch => {
  dispatch(ToDoRequest(types.SENTCONTACTUS_REQUEST))
  return await serviceController(routes.sentContactUs, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.SENTCONTACTUS_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.SENTCONTACTUS_ERROR, error.message)))
}

export const contact = {
  getContactUs,
  sentContactUs
}