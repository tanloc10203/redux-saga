import couterSaga from 'features/counter/couterSaga';
import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Saga!!!');
}

export default function* rootSaga() {
  console.log('Root Saga!!!');
  yield all([helloSaga(), couterSaga()]);
}
