import * as url from './apiUrl';
import { post } from './apiHelpers';

export const onLogin = async (cred) => {
    return await post(url.login, cred).then(response => response)
}

export const onRegister = async (cred) => {
    return await post(url.register, cred).then(response => response)
}