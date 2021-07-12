import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getAbout = params => async dispatch => {
  dispatch(ToDoRequest(types.GETABOUTUS_REQUEST))
  return await serviceController(`${routes.getAbout}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETABOUTUS_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETABOUTUS_ERROR, error.message)))
}

export const about = {
  getAbout
}