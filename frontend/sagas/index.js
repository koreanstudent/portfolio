import { all, fork } from 'redux-saga/effects';
import post from './post';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/'; // 한번 불러온 모듈은 캐싱이 된다.

export default function* rootSaga() {
  yield all([
    fork(post),
  ]);
}