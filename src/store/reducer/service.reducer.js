import * as types from '../types'

const initialState = {
  error: null,
  isLoading: false,
  serviceLocation_data: null,
  sentExpressService_data: null,
  express_data: null,
  expressType_data: null,
  sentHomeService_data: null,
  homeService_daa: null,
  homeServicetype_data: null,
  serviceSetting_data: null
}

const services = (state = initialState, action) => {
  switch (action.type) {
    case types.SENTEXPRESSSERVICE_REQUEST: // sentExpressService
      return {
        ...state,
        isLoading: true
      }
    case types.SENTEXPRESSSERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentExpressService_data: action.data
      }
    case types.SENTEXPRESSSERVICE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETEXPRESSSERVICE_REQUEST: // getExpressService
      return {
        ...state,
        isLoading: true
      }
    case types.GETEXPRESSSERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        express_data: action.data
      }
    case types.GETEXPRESSSERVICE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETEXPRESSSERVICETYPE_REQUEST: // getExpressServiceType
      return {
        ...state,
        isLoading: true
      }
    case types.GETEXPRESSSERVICETYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expressType_data: action.data
      }
    case types.GETEXPRESSSERVICETYPE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case types.SENTHOMESERVICE_REQUEST: // sentHomeService
      return {
        ...state,
        isLoading: true
      }
    case types.SENTHOMESERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentHomeService_data: action.data
      }
    case types.SENTHOMESERVICE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETHOMESERVICE_REQUEST: // getHomeService
      return {
        ...state,
        isLoading: true
      }
    case types.GETHOMESERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeService_data: action.data
      }
    case types.GETHOMESERVICE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETHOMESERVICETYPE_REQUEST: // getHomeServiceType
      return {
        ...state,
        isLoading: true
      }
    case types.GETHOMESERVICETYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeServicetype_data: action.data
      }
    case types.GETHOMESERVICETYPE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETSERVICELOCATION_REQUEST: // getServiceLocation
      return {
        ...state,
        isLoading: true
      }
    case types.GETSERVICELOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        serviceLocation_data: action.data
      }
    case types.GETSERVICELOCATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.GETSERVICESETTING_REQUEST: // getServiceSetting
      return {
        ...state,
        isLoading: true
      }
    case types.GETSERVICESETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        serviceSetting_data: action.data
      }
    case types.GETSERVICESETTING_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default services