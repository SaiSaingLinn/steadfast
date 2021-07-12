import * as types from '../types' 
import { langLocalStore } from '../../service'

const initialState = {
  error: null,
  isLoading: false,
  translation_data: null,
  langStore: langLocalStore.getLanguage() ?
    langLocalStore.getLanguage() :
    { 
      lang: 'English', 
      code: 'en', 
      lang_icon: require('../../assets/img/icons/england-flag.jpg').default 
    }
}

const translate = (state = initialState, action) => {
  switch (action.type) {
    case types.GETTRANSLATION_REQUEST: // getTranslation
      return {
        ...state,
        isLoading: true
      }
    case types.GETTRANSLATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        translation_data: action.data
      }
    case types.GETTRANSLATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'LANG_CODE_OBJ':
      langLocalStore.setLanguage(action.data)
      return {
        ...state,
        langStore: action.data
      }
    default:
      return state
  }
}

export default translate