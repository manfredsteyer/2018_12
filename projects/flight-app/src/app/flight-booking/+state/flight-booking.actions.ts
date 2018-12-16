import { Action } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  FlightsLoaded = '[FlightBooking] FlightsLoaded',
  // LoadFlight = '[FlightBooking] FlightsLoaded',
  UpdateFlight = '[FlightBooking] UpdateFlight'
}

export class FlightsLoaded implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoaded;
  constructor(readonly payload: { flights: Flight[]}) {
  }
}

export class UpdateFlight implements Action {
  readonly type = FlightBookingActionTypes.UpdateFlight;
  constructor(readonly payload: { flight: Flight}) {
  }
}

export type FlightBookingActions = FlightsLoaded | UpdateFlight;
