import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter } from 'utils'

const getLatestProduct = params => async dispatch => {
  dispatch(ToDoRequest(types.GETLATESTPRODUCT_REQUEST))
  return await serviceController(`${routes.getLatestProduct}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETLATESTPRODUCT_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETLATESTPRODUCT_ERROR, error.message)))
}

const getFeaturedCategory = params => async dispatch => {
  dispatch(ToDoRequest(types.GETFEATUREDCATEGORY_REQUEST))
  return await serviceController(`${routes.getFeaturedCategory}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETFEATUREDCATEGORY_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETFEATUREDCATEGORY_ERROR, error.message)))
}

const getFeaturedProduct = params => async dispatch => {
  dispatch(ToDoRequest(types.GETfEATUREDPRODUCT_REQUEST))
  return await serviceController(`${routes.getFeaturedProduct}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETfEATUREDPRODUCT_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETfEATUREDPRODUCT_ERROR, error.message)))
}

export const websiteGallery = {
  getLatestProduct,
  getFeaturedCategory,
  getFeaturedProduct

}