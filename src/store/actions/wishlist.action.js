import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'

const getWishlist = (lang, user_id) => async dispatch => {
  dispatch(ToDoRequest(types.GETWISHLIST_REQUEST))
  return await serviceController(`${routes.getWishlist}?lang=${lang}&user_id=${user_id}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        let tmp = res?.data?.data.map(x => x.qty = 1)
        dispatch(ToDoSuccess(types.GETWISHLIST_SUCCESS, res.data.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETWISHLIST_ERROR, error.message)))
}

const getWishlistqtychange = (product_id, variant_id, qty, wishlist_data) => async dispatch => {
  return await serviceController(`${routes.checkProductQty}?product_id=${product_id}&variant_id=${variant_id}&qty=${qty}`)
    .then(res => {
      if (res?.data?.data[0]?.instock) {
        if (wishlist_data) {
          let tmp = wishlist_data?.filter(x => x.product_id === product_id).map(y => (y.qty = qty, y.status = 'in_stock'))
          dispatch(ToDoSuccess(types.GETWISHLIST_SUCCESS, wishlist_data))
        }
      } else {
        if (wishlist_data) {
          let tmp = wishlist_data?.filter(x => x.product_id === product_id).map(y => (y.qty = qty, y.status = 'out_of_stock'))
          dispatch(ToDoSuccess(types.GETWISHLIST_SUCCESS, wishlist_data))
        }
      }
    })
    .catch(error => console.log('error wishlist qty change', error.message))
}

const createWishlist = data => async dispatch => {
  dispatch(ToDoRequest(types.CREATEWISHLIST_REQUEST))
  return await serviceController(`${routes.createWishlist}`, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.CREATEWISHLIST_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.CREATEWISHLIST_ERROR, error.message)))
}

const removeWishlist = data => async dispatch => {
  dispatch(ToDoRequest(types.REMOVEWISHLIST_REQUEST))
  return await serviceController(`${routes.removeWishlist}`, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.REMOVEWISHLIST_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.REMOVEWISHLIST_ERROR, error.message)))
}

const existsWishlist = (user_id, variant_id, product_id) => async dispatch => {
  dispatch(ToDoRequest(types.EXISTWISHLIST_REQUEST))
  return await serviceController(`${routes.getExistsWishlist}?user_id=${user_id}&variant_id=${variant_id}&product_id=${product_id}`)
    .then(res => {
      if (res.data.data.status === 'Does not exist!') {
        dispatch(ToDoSuccess(types.EXISTWISHLIST_SUCCESS, res.data))
        return res.data
      } else {
        dispatch(ToDoSuccess(types.EXISTWISHLIST_SUCCESS, res.data))
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.EXISTWISHLIST_ERROR, error.message)))
}

export const wishlist = {
  getWishlist,
  getWishlistqtychange,
  createWishlist,
  removeWishlist,
  existsWishlist
}