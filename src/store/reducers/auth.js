import * as actionTypes from '../actions/types'


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                userId: null,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                error: null,
                loading: false
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            console.log('path::', action.path)
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
  }
}

export default reducer