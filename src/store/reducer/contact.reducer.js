import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  contact_data: null,
  sentContact_data: null
}

const contact = (state = initialState, action) => {
  switch (action.type) {
    case types.GETCONTACTUS_REQUEST: // getContact
      return {
        ...state,
        isLoading: true
      }
    case types.GETCONTACTUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contact_data: action.data
      }
    case types.GETCONTACTUS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.SENTCONTACTUS_REQUEST: // sentContact
      return {
        ...state,
        isLoading: true
      }
    case types.SENTCONTACTUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentContact_data: action.data
      }
    case types.SENTCONTACTUS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default contact