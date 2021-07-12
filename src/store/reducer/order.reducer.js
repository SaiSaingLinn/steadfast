import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  order_data: null,
  orderbyid_data: null
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case types.GETORDER_REQUEST: // GETORDER
      return {
        ...state,
        isLoading: true
      }
    case types.GETORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order_data: action.data
      }
    case types.GETORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETORDERBYID_REQUEST: // GETORDERBYID
      return {
        ...state,
        isLoading: true
      }
    case types.GETORDERBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderbyid_data: action.data
      }
    case types.GETORDERBYID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default order