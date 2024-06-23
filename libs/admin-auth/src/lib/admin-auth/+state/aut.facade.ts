import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
 import * as AuthSelectors from './auth.selectors';
import { LoginRequest } from "./auth.models";
import * as Actions from './auth.actions';

@Injectable({
    providedIn:'root'
})
export class AuthFacade {
  constructor(public readonly store: Store) {

  }
  // login selectors
  isLoginCalling$ = this.store.pipe(select(AuthSelectors.isLoginLoading));
  loginErrorMessage$ = this.store.pipe(select(AuthSelectors.isLoginError));
  isLoginSuccess$ = this.store.pipe(select(AuthSelectors.isLoginSuccess));

  login(request: LoginRequest){
    this.store.dispatch(Actions.initLogin({login: request}))
  }
}