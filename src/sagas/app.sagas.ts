import {takeLatest, put, call} from 'redux-saga/effects';
import * as t from '@/actionTypes';
import * as api from '@/api/user.api';
import actions from '@/actions';

function* getInfoWorker(action: any) {
  try {
    console.log('[SAGA] get info');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKb2tlbiIsImVtYWlsIjoic3RhZ2luZysxNjA5anVuOUBnbWFpbC5jb20iLCJleHAiOjE2MTE4MjQzMzcsImlhdCI6MTYwNDA0ODMzNywiaXNzIjoiSm9rZW4iLCJqdGkiOiIycDFiaXRtN2lkMThjMWF2YTAwMDBrNmgiLCJuYmYiOjE2MDQwNDgzMzd9.qIpujdm_aY-Dfw80XEbo7PGAjtGRx1FyYvfT4_ijmaM';
    const res: any = yield call(api.getUserAccountInfo);
    console.log('[SAGA] get info', res);

    yield put(actions[t.GET_APP_INFO_SUCCESS](res.data));
  } catch (error) {
    console.log(error);
    yield put(actions[t.GET_APP_INFO_FAILED](error.message));
  }
}

export function* getInfoWatcher() {
  yield takeLatest(t.GET_APP_INFO_REQUEST, getInfoWorker);
}
