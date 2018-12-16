import { FlightBookingState } from './../flight-booking/+state/flight-booking.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {
  currentUser: string;
  counter: number;
  //flightBooking?: FlightBookingState
}

export function currentUserReducer(state: string, action) {
  return state;
}

export function counterReducer(currentCounter: number = 0, action: Action) {
  switch(action.type) {
    case "increment":
      return currentCounter + 1;
    case "decrement":
      return currentCounter - 1;
    default:
      return currentCounter;
  }
}


export const reducers: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer,
  counter: counterReducer
};


export const metaReducers: MetaReducer<AppState>[] = 
          !environment.production ? [] : [];
