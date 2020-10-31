import * as t from '@/actionTypes';

export const initialState = {
  info: null,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    // get otp
    case t.GET_APP_INFO_REQUEST:
      return {
        ...state,
      };
    case t.GET_APP_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload,
      };
    case t.GET_APP_INFO_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const appSelectors: any = {
  getAppInfo: (state: any) => state.app.info,
};
