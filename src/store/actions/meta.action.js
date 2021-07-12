import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getMetaData = params => async dispatch => {
  dispatch(ToDoRequest(types.GETMETADATA_REQUEST))
  return await serviceController(`${routes.getMetaData}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETMETADATA_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETMETADATA_ERROR, error.message)))
}

export const Meta = {
  getMetaData
}