import { Action } from '@ngrx/store';
import { FlightBookingActions, FlightBookingActionTypes } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { AppState } from '../../+state';

export interface FlightBookingAppStateFragment extends AppState {
  flightBooking: FlightBookingState
}

export interface FlightBookingState {
  flights: Flight[];
  basket: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {}
};

export function reducer(state = initialState, action: FlightBookingActions): FlightBookingState {
  
  switch (action.type) {

    case FlightBookingActionTypes.FlightsLoaded:
      // action.payload.flights
      return { ...state, flights: action.payload.flights };

    case FlightBookingActionTypes.UpdateFlight:

      // action.payload.flight
      const newFlights = state.flights.map(
        f => f.id == action.payload.flight.id ? 
                                action.payload.flight : f ) 

      return { ...state, flights: newFlights }

    default:
      return state;
  }
}
