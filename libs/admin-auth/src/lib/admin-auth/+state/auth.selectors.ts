import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, LoginState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const selectLoginState =
  createFeatureSelector<LoginState>(AUTH_FEATURE_KEY);


export const isLoginLoading = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoading
);


export const isLoginError = createSelector(
  selectLoginState,
  (state: LoginState) => state.errorMessage
);


export const isLoginSuccess = createSelector(
  selectLoginState,
  (state: LoginState) => state.isSuccess
);

