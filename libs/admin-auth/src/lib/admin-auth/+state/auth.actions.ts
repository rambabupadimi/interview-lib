import { createAction, props } from '@ngrx/store';
import { APIResponse, AuthEntity, LoginRequest, LoginResponse } from './auth.models';


export const initLogin = createAction('[Login Page] Init', props<{login: LoginRequest}>());

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ response: APIResponse<LoginResponse> }>()
);

export const loginFailed = createAction(
  '[Login] Login Failure',
  props<{ error: any }>()
);



export const initAuth = createAction('[Auth Page] Init', props<{login: LoginRequest}>);

export const loadAuthSuccess = createAction(
  '[Auth/API] Load Auth Success',
  props<{ auth: AuthEntity[] }>()
);

export const loadAuthFailure = createAction(
  '[Auth/API] Load Auth Failure',
  props<{ error: any }>()
);
