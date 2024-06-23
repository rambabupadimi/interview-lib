import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity, LoginResponse } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';


export interface LoginState {
  isLoading: boolean,
  result: LoginResponse | undefined,
  errorMessage: string | null,
  isSuccess: boolean
}
export const loginState : LoginState= {
  isLoading: false,
  result: undefined,
  errorMessage: null,
  isSuccess:false
};

const reducer = createReducer(
  loginState,
  on(AuthActions.initAuth, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) =>
    ({ ...state, isLoading: false, result : response.data, isSuccess:true})
  ),
  on(AuthActions.loginFailed, (state, { error }) => ({ ...state, errorMessage:error, isLoading:false }))
);

export function authReducer(state: LoginState, action: Action) {
  return reducer(state, action);
}
