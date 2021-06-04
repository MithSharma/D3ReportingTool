import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { active } from 'd3-transition';
import { login, logout } from '../auth.actions';

export const authFeatureKey = 'auth';

export const initialAuthState:AuthState = {

}

export interface AuthState {

}
export const authReducer = createReducer(
    initialAuthState,
    on(login,(state,action)=>{
      return {
        user:action.user
      }
    }),
    on(logout,(state,action)=>{
        return {
          user:undefined
        }
    })
)
