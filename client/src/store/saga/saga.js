import { fork, all } from 'redux-saga/effects';
import authSaga from './authSaga';

function* rootSaga(){
    yield all([
        fork(authSaga)
    ])
}

export default rootSaga;