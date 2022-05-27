import authSaga from 'features/auth/authSaga';
import couterSaga from 'features/counter/couterSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('Root Saga!!!');
  yield all([couterSaga(), authSaga()]);
}
