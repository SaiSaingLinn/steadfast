import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getSlider = params => async dispatch => {
  dispatch(ToDoRequest(types.GETSLIDER_REQUEST))
  return await serviceController(`${routes.getWebsiteSlider}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETSLIDER_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETSLIDER_ERROR, error.message)))
}

export const BannerSlider = {
  getSlider
}