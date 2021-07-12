import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'

const getTranslation = () => async dispatch => {
  dispatch(ToDoRequest(types.GETTRANSLATION_REQUEST))
  return await serviceController(routes.getTranslation) //`${routes.getTranslation}?lang=${lang}`
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETTRANSLATION_SUCCESS, res.data.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETTRANSLATION_ERROR, error.message)))
}

const setLangStore = (type, data) => {
  return ({
    type,
    data
  })
}

export const translation = {
  getTranslation,
  setLangStore
}