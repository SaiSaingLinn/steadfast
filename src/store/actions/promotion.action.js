import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getPromotion = params => async dispatch => {
  dispatch(ToDoRequest(types.GETPROMOTION_REQUEST))
  return await serviceController(`${routes.getPromotion}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPROMOTION_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPROMOTION_ERROR, error.message)))
}

const getPromoDetailList = params => async dispatch => {
  dispatch(ToDoRequest(types.GETPROMODETAILLIST_REQUEST))
  return await serviceController(`${routes.getPromoDetailList}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETPROMODETAILLIST_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPROMODETAILLIST_ERROR, error.message)))
}

export const Promotion = {
  getPromotion,
  getPromoDetailList
}