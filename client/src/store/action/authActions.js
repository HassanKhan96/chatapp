import { GET_AUTH } from "../type";

export const login = (cred) => {
    console.log(cred)
    return {type: GET_AUTH,
    cred}
}