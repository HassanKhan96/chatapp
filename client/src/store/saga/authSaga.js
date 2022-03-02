import { takeEvery, all} from 'redux-saga/effects';
import { GET_AUTH} from '../type';

function* onLogin({ username, password}){
    console.log(username, password)
}

function* watchAll(){
    yield all([
        takeEvery(GET_AUTH, onLogin)
    ])
}

export default watchAll;