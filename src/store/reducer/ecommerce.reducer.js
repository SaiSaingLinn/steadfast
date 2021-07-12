import * as types from '../types'
import { orderStore } from '../../service'

const initialState = {
  error: null,
  isLoading: false,
  createcart_data: null,
  cart_data: null,
  deletecart_data: null,
  deliveryInfo_data: null,
  paymentList_data: null,
  orderStore_data: orderStore.getOrder() || null
}

const ecommerce = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATECART_REQUEST: // createCart
      return {
        ...state,
        isLoading: true
      }
    case types.CREATECART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // sale_order_id: action?.data?.result[0]?.order_id,
        createcart_data: action.data
      }
    case types.CREATECART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETCART_REQUEST: // getCart
      return {
        ...state,
        isLoading: true
      }
    case types.GETCART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // sale_order_name: action?.data?.sale_order,
        cart_data: action.data
      }
    case types.GETCART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETTICKETCART_REQUEST: // GETTICKETCART
      return {
        ...state,
        isLoading: true
      }
    case types.GETTICKETCART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // sale_order_name: action?.data?.sale_order,
        cart_ticket_data: action.data
      }
    case types.GETTICKETCART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.DELETECART_REQUEST: // deleteCart
      return {
        ...state,
        isLoading: true
      }
    case types.DELETECART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deletecart_data: action.data
      }
    case types.DELETECART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.DELETEALLINCART_REQUEST: // deleteAllInCart
      return {
        ...state,
        isLoading: true
      }
    case types.DELETEALLINCART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteallincart_data: action.data
      }
    case types.DELETEALLINCART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.CREATESHIPPING_REQUEST: // createShipping
      return {
        ...state,
        isLoading: true
      }
    case types.CREATESHIPPING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createshipping_data: action.data
      }
    case types.CREATESHIPPING_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETDELIVERYINFORMATION_REQUEST: // getDeliveryInformation
      return {
        ...state,
        isLoading: true
      }
    case types.GETDELIVERYINFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deliveryInfo_data: action.data
      }
    case types.GETDELIVERYINFORMATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETPAYMENTLIST_REQUEST: // getPaymentList
      return {
        ...state,
        isLoading: true
      }
    case types.GETPAYMENTLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentList_data: action.data
      }
    case types.GETPAYMENTLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.PAYNOW_REQUEST: // payNow
      return {
        ...state,
        isLoading: true
      }
    case types.PAYNOW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payNow_data: action.data
      }
    case types.PAYNOW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'ORDER_STORE_OBJ':
      orderStore.setOrder(action.data)
      return {
        ...state,
        orderStore_data: action.data
      }
    case 'ORDER_STORE_REMOVE_OBJ':
      orderStore.removeOrder()
      return {
        ...state,
        cart_data: null,
        orderStore_data: action.data
      }
    default:
      return state
  }
}

export default ecommerce