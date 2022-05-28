import authSaga from 'features/auth/authSaga';
import couterSaga from 'features/counter/couterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/students/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('Root Saga!!!');
  yield all([couterSaga(), authSaga(), dashboardSaga(), studentSaga()]);
}
