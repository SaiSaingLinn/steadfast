import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getHomeContent = params => async dispatch => {
  dispatch(ToDoRequest(types.GETHOMECONTENT_REQUEST))
  return await serviceController(`${routes.getHomePageContent}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETHOMECONTENT_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETHOMECONTENT_ERROR, error.message)))
}

export const HomeContent = {
  getHomeContent
}