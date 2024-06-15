import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AppEffects {
  constructor(public actions$: Actions,
    public router: Router) {
  }
}