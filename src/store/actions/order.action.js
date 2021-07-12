import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from '../../utils'

const getOrder = params => async dispatch => {
  dispatch(ToDoRequest(types.GETORDER_REQUEST))
  return await serviceController(`${routes.getOrder}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETORDER_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETORDER_ERROR, error.message)))
}

const getOrderById = params => async dispatch => {
  dispatch(ToDoRequest(types.GETORDERBYID_REQUEST))
  return await serviceController(`${routes.getOrderById}?${routeFilter(params)}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        await res?.data?.data[0]?.products?.sort((a, b) => a.product_type > b.product_type ? 1 : -1)
        dispatch(ToDoSuccess(types.GETORDERBYID_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETORDERBYID_ERROR, error.message)))
}

export const order = {
  getOrder,
  getOrderById
}