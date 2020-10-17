import * as actionTypes from '../actions/types'
import axios from 'axios'


// field names used for localStorage
const TOKEN = 'token'
const EXPIRATION_DATE = 'expirationDate'
const USER_ID = 'userId'

export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
})

export const logout = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(EXPIRATION_DATE)
    localStorage.removeItem(USER_ID)
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expirationTime * 1000) // turn to miliseconds
}

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart())

    // sign up url
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeXU4Q-oXdxpA_TTHmipCFiwJQccSlYkg'
    // check if user wants to sign in
    if (!isSignup) { 
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeXU4Q-oXdxpA_TTHmipCFiwJQccSlYkg'
    }

    const authData = {
        email,
        password,
        returnSecureToken: true
    }

    axios.post(url, authData)
        .then(res => {
            const { idToken, localId, expiresIn } = res.data
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

            localStorage.setItem(TOKEN, idToken)
            localStorage.setItem(EXPIRATION_DATE, expirationDate)
            localStorage.setItem(USER_ID, localId)

            dispatch(authSuccess(idToken, localId))
            dispatch(checkAuthTimeout(expiresIn))
        }).catch(error => {
            console.log(error)
            console.log(error.response)
            dispatch(authFail(error.response.data.error))
        })
}

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem(TOKEN)
    if (!token) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE))
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem(USER_ID)
            dispatch(authSuccess(token, userId))
            const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
            dispatch(checkAuthTimeout(expiresIn))
        }
    }
}

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
})