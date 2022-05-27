import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

// export function* log(action: PayloadAction) {
//   console.log('Log action: ', action);
// }

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('wait 2s');
  yield delay(2000);

  console.log('done wait 2s, dispach actions');
  yield put(incrementSagaSuccess(action.payload));
}

export default function* couterSaga() {
  console.log('Couter Saga!!!');
  // yield takeEvery(incrementSaga.toString(), handleIncrementSaga); // nhấn bấy nhiêu sẽ chạy bấy nhiêu

  yield takeLatest(incrementSaga.toString(), handleIncrementSaga); // chỉ chạy 1 lần nếu nhấn 1 lần rồi nhấn lần nữa thì nó sẽ ko chạy lần đàu nữa mà chạy lân 2 tương tự như vậy
}
