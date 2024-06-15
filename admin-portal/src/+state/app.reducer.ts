import { createReducer } from "@ngrx/store";

export const APP_FEATURE_KEY = 'appRoot';

export const initialAppState = {
   
    userTimezone:   undefined,
   
  }
  
  
  const reducer = createReducer(
    initialAppState);  

  export function appReducer(state: any | undefined, action: any) {
    return reducer(state, action);
  }