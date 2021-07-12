import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  myserviceticketsummary_data: null,
  myserviceticket_data: null
}

const myServiceTicket = (state = initialState, action) => {
  switch (action.type) {
    case types.GETMYSERVICETICKETSUMMARY_REQUEST: // GETMYSERVICETICKETSUMMARY
      return {
        ...state,
        isLoading: true
      }
    case types.GETMYSERVICETICKETSUMMARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myserviceticketsummary_data: action.data
      }
    case types.GETMYSERVICETICKETSUMMARY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.GETMYSERVICETICKET_REQUEST: // GETMYSERVICETICKET
      return {
        ...state,
        isLoading: true
      }
    case types.GETMYSERVICETICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myserviceticket_data: action.data
      }
    case types.GETMYSERVICETICKET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default myServiceTicket