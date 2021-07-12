import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from '../../utils'

const getMyServiceTicketSummary = params => async dispatch => {
  dispatch(ToDoRequest(types.GETMYSERVICETICKETSUMMARY_REQUEST))
  return await serviceController(`${routes.getMyServiceTicketSummary}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETMYSERVICETICKETSUMMARY_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETMYSERVICETICKETSUMMARY_ERROR, error.message)))
}

const getMyServiceTicket = params => async dispatch => {
  dispatch(ToDoRequest(types.GETMYSERVICETICKET_REQUEST))
  return await serviceController(`${routes.getMyServiceTicket}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETMYSERVICETICKET_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETMYSERVICETICKET_ERROR, error.message)))
}

export const myserviceticket = {
  getMyServiceTicket,
  getMyServiceTicketSummary
}