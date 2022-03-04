import { takeEvery, all, call, put } from 'redux-saga/effects';
import { GET_AUTH, GET_REGISTER } from '../type';
import { onLogin, onRegister } from '../../helpers/backendHelpers';
import { onAuthSuccess, onAuthFailed } from '../action/authActions';

function* login({ cred }) {
    try {
        const response = yield call(onLogin, cred)
        yield put(onAuthSuccess(response.data.data));
    }
    catch (error) {
        yield put(onAuthFailed(error.response.data));
    }
}

function* register({cred}){
    try {
        const response = yield call(onRegister, cred);
        yield put(onAuthSuccess(response.data.data));
    } catch (error) {
        yield put(onAuthFailed(error.response.data))
    }
}

function* authSaga() {
    yield all([
        takeEvery(GET_AUTH, login),
        takeEvery(GET_REGISTER, register)
    ])
}

export default authSaga;