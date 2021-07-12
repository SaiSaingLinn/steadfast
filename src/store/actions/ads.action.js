import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getAds = params => async dispatch => {
  dispatch(ToDoRequest(types.GETADS_REQUEST))
  return await serviceController(`${routes.getAds}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETADS_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETADS_ERROR, error.message)))
}

export const Ads = {
  getAds
}