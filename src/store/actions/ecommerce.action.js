import * as types from '../types'
import serviceController, { routes } from '../../controller'
import { ToDoRequest, ToDoSuccess, ToDoError } from './typehandle.action'

import { radioCheckChange, getCheckId } from '../../utils'

const createCart = (data, uid, lang, ticket) => async dispatch => {
  dispatch(ToDoRequest(types.CREATECART_REQUEST))
  return await serviceController(routes.createCart, data)
    .then(res => {
      if (res?.data?.result[0]?.status !== 'fail') {
        dispatch(ToDoSuccess(types.CREATECART_SUCCESS, res.data))
        // console.log(`ticket`, ticket)
        !ticket && dispatch(setOrderStore('ORDER_STORE_OBJ', res.data?.result[0]))
        !ticket ? 
        dispatch(getCart(res?.data?.result[0]?.order_id, uid || '', lang)) :
        dispatch(getTicketCart(res?.data?.result[0]?.order_id, uid || '', lang))
        return res.data
      } else {
        // order_id && dispatch(getCart(order_id, uid || '', lang))
        console.log(`res?.data`, res?.data)
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.CREATECART_ERROR, error.message)))
}

const getCart = (order_id, user_id, lang) => async dispatch => {
  dispatch(ToDoRequest(types.GETCART_REQUEST))
  return await serviceController(`${routes.getCart}?order_id=${order_id}&user_id=${user_id}&lang=${lang}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        // let tmp = await res?.data?.data?.order_lines?.sort((a, b) => a.product_type > b.product_type ? 1 : -1)
        // console.log(`res?.data?.data?.products`, res?.data?.data?.products)
        let tmp = await res?.data?.data?.products
        // let tmp = await res?.data?.data?.products?.sort((a, b) => a.product_type > b.product_type ? 1 : -1)
        let final_result = {
          ...res.data,
          ...res.data.data,
          data: tmp
        }
        delete final_result.products
        dispatch(ToDoSuccess(types.GETCART_SUCCESS, final_result))
        return final_result
      }
    })
    .catch(error => dispatch(ToDoError(types.GETCART_ERROR, error.message)))
}

const getTicketCart = (order_id, user_id, lang) => async dispatch => {
  dispatch(ToDoRequest(types.GETTICKETCART_REQUEST))
  return await serviceController(`${routes.getCart}?order_id=${order_id}&user_id=${user_id}&lang=${lang}`)
    .then(async res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        // let tmp = await res?.data?.data?.order_lines?.sort((a, b) => a.product_type > b.product_type ? 1 : -1)
        // console.log(`res?.data?.data?.products`, res?.data?.data?.products)
        let tmp = await res?.data?.data?.products
        // let tmp = await res?.data?.data?.products?.sort((a, b) => a.product_type > b.product_type ? 1 : -1)
        let final_result = {
          ...res.data,
          ...res.data.data,
          data: tmp
        }
        delete final_result.products
        dispatch(ToDoSuccess(types.GETTICKETCART_SUCCESS, final_result))
        return final_result
      }
    })
    .catch(error => dispatch(ToDoError(types.GETTICKETCART_ERROR, error.message)))
}

const deleteCart = (data, langCode) => async dispatch => {
  dispatch(ToDoRequest(types.DELETECART_REQUEST))
  return await serviceController(routes.deleteCart, data)
    .then(res => {
      if (res?.data?.result?.status === 'success') {
        dispatch(ToDoSuccess(types.DELETECART_SUCCESS, res.data))
        dispatch(getCart(data?.data?.order_id, data?.data?.user_id || '', langCode))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.DELETECART_ERROR, error.message)))
}

const deleteAllInCart = (data, langCode) => async dispatch => {
  dispatch(ToDoRequest(types.DELETEALLINCART_REQUEST))
  return await serviceController(routes.deleteAllInCart, data)
    .then(res => {
      if (res?.data?.result?.status === 'success') {
        dispatch(getCart(data?.data?.order_id, data?.data?.user_id || '', langCode))
        dispatch(ToDoSuccess(types.DELETEALLINCART_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.DELETEALLINCART_ERROR, error.message)))
}

const createShipping = data => async dispatch => {
  dispatch(ToDoRequest(types.CREATESHIPPING_REQUEST))
  return await serviceController(routes.createShipping, data)
    .then(res => {
      if (res?.data?.status === 'fail') {
        return res.data
      } else {
        dispatch(ToDoSuccess(types.CREATESHIPPING_SUCCESS, res.data))
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.CREATESHIPPING_ERROR, error.message)))
}

const getDeliveryInformation = () => async dispatch => {
  dispatch(ToDoRequest(types.GETDELIVERYINFORMATION_REQUEST))
  return await serviceController(routes.getDeliveryInformation)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        dispatch(ToDoSuccess(types.GETDELIVERYINFORMATION_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETDELIVERYINFORMATION_ERROR, error.message)))
}

const getPaymentList = (user_id, ticket) => async dispatch => {
  dispatch(ToDoRequest(types.GETPAYMENTLIST_REQUEST))
  return await serviceController(`${routes.getPaymentList}?user_id=${user_id}`)
    .then(res => {
      if (res.data.data.error) {
        console.log(res.data)
      } else {
        // console.log(`ticket`, ticket)
        let id = ticket ? res?.data?.data?.filter(x => x?.payment_method_code === '2C2P') : res?.data?.data?.filter(x => x?.payment_method_code === 'COD')
        // console.log(`id`, id)
        res.data.selected_id = id[0]?.payment_method_id
        id[0].check = true
        dispatch(ToDoSuccess(types.GETPAYMENTLIST_SUCCESS, res.data))
      }
    })
    .catch(error => dispatch(ToDoError(types.GETPAYMENTLIST_ERROR, error.message)))
}

const getPaymentChange = (type, array, id) => async dispatch => {
  let res = await radioCheckChange(type, array, id)
  let id_res = await getCheckId(type, res)
  let data = {
    count: res?.length,
    selected_id: id_res[0],
    data: res
  }
  dispatch(ToDoSuccess(types.GETPAYMENTLIST_SUCCESS, data))
}

const setOrderStore = (type, data) => {
  return ({
    type,
    data
  })
}

const payNow = (data, method_code) => async dispatch => {
  dispatch(ToDoRequest(types.PAYNOW_REQUEST))
  return await serviceController(method_code === 'other_pay' ? routes.PayNow_2c2p : routes.payNow, data)
    .then(res => {
      if (res.data.result.status === 'success') {
        dispatch(ToDoSuccess(types.PAYNOW_SUCCESS, res.data))
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => dispatch(ToDoError(types.PAYNOW_ERROR, error.message)))
}

export const Ecommerce = {
  createCart,
  getCart,
  getTicketCart,
  deleteCart,
  deleteAllInCart,
  setOrderStore,
  createShipping,
  getDeliveryInformation,
  getPaymentList,
  getPaymentChange,
  payNow
}