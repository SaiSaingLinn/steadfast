import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from '../../utils'

const getWebsiteUnfo = params => async dispatch => {
  dispatch(ToDoRequest(types.GETWEBSITEINFO_REQUEST))
  return await serviceController(`${routes.getWebsiteUnfo}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        console.log(res.data)
        dispatch(ToDoSuccess(types.GETWEBSITEINFO_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETWEBSITEINFO_ERROR, error.message)))
}

export const websiteInfo = {
  getWebsiteUnfo
}