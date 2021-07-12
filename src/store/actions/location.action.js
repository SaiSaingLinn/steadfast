import * as types from 'store/types'
import serviceController, { routes } from 'controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'
import { routeFilter, checkChange, getCheckId } from 'utils'

const getCityList = lang => async dispatch => {
  dispatch(ToDoRequest(types.GETCITYLIST_REQUEST))
  return await serviceController(`${routes.getCityList}?lang=${lang}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETCITYLIST_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETCITYLIST_ERROR, error.message)))
}

const getCountryList = params => async dispatch => {
  dispatch(ToDoRequest(types.GETCOUNTRYLIST_REQUEST))
  return await serviceController(`${routes.getCountryList}?${routeFilter(params)}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETCOUNTRYLIST_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETCOUNTRYLIST_ERROR, error.message)))
}

// check change
const getCheckChange = (type, array, id) => async dispatch => {
  let res = await checkChange(type, array, id)
  let id_res = await getCheckId(type, res)

  let data = {
    count: res?.length,
    country_id: id_res,
    data: res
  }
  console.log(data)
  dispatch(ToDoSuccess(types.GETCOUNTRYLIST_SUCCESS, data))
}

export const Location = {
  getCityList,
  getCountryList,
  getCheckChange
}