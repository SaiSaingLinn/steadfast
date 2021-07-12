const initialState = {
  isProfileData: null,
}

const emit = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ISPROFILEDATA':
      return {
        ...state,
        isProfileData: payload
      }
    default:
      return state
  }
}

export default emit