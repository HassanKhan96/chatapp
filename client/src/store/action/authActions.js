import { AUTH_FAILED, AUTH_SUCCESS, GET_AUTH } from "../type";

export const onAuth = (cred) => {
    return {
        type: GET_AUTH,
        cred
    }
}

export const onAuthSuccess = (token) => ({
    type: AUTH_SUCCESS,
    payload: token
})

export const onAuthFailed = (error) => ({
    type: AUTH_FAILED,
    payload: error
})