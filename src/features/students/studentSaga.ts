import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/student';
import { ListParams, ListResponses, Student } from 'models';
import { call, takeLatest, put, debounce } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponses<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student !!!', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchWithDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
  yield debounce(500, studentActions.setFilterDebounce.type, handleSearchWithDebounce);
}
