import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private router: Router) {}

  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initLogin),
      switchMap((action: any) => {

        return this.authService.logIn(action.login).pipe(
          map((res: any) => {

            localStorage.setItem('login',JSON.stringify(res.data));
            localStorage.setItem('accessToken',res.data.accessToken);
            localStorage.setItem('refreshToken',res.data.refreshToken);

            return AuthActions.loginSuccess({ response: res.data });
          }),
          tap(() => this.router.navigateByUrl('/dashboard')),
          catchError((err) => {
            return of(AuthActions.loginFailed({ error: err.error.message }));
          })
        );
      })
    )
  );
}
