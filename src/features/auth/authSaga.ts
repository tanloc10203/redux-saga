import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { fork, take, delay, call, put } from 'redux-saga/effects';
import { LoginPayLoad, authActions } from './authSlice';

function* handleLogin(payload: LoginPayLoad) {
  try {
    // Call API
    // yield call(api, ...arguments);
    yield delay(1000);
    localStorage.setItem('access_token', 'fake_login');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'FAKE LOGIN',
      })
    );

    // redirect to admin page.
    yield put(push('/admin/dashboard'));
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows err is Error
      yield put(authActions.loginFail(error.message));
    } else {
      console.log('Unexpected error', error);
    }
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page.
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const actions: PayloadAction<LoginPayLoad> = yield take(authActions.login.type);
      yield fork(handleLogin, actions.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
