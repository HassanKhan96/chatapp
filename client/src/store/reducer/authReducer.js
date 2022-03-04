import { AUTH_FAILED, AUTH_SUCCESS, GET_AUTH } from "../type";

const INITIAL_STATE = {
    token: null,
    loading: false,
    error: null
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case GET_AUTH:
            return { ...state, ...INITIAL_STATE, loading: true}
        case AUTH_SUCCESS:
            return { ...state, ...INITIAL_STATE, token: action.payload}
        case AUTH_FAILED:
            return { ...state, ...INITIAL_STATE, error: action.payload}
        default:
        return state;
    }
}