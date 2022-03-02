import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';

function *rootSaga(){
    yield [
        fork(authSaga)
    ]
}

export default rootSaga;