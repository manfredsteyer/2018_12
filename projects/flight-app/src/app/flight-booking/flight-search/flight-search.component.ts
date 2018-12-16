import { UpdateFlight } from './../+state/flight-booking.actions';
import { AppState } from './../../+state/index';
import {Component, OnInit} from '@angular/core';

import {FlightService, Flight} from '@flight-workspace/flight-api';

import { Store } from '@ngrx/store';
import { FlightBookingAppStateFragment } from '../+state/flight-booking.reducer';
import { Observable } from 'rxjs';
import { FlightsLoaded } from '../+state/flight-booking.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<FlightBookingAppStateFragment>,
    private flightService: FlightService) {
  }

  flights$: Observable<Flight[]>

  ngOnInit() {
    this.flights$ = this.store.select(s => s.flightBooking.flights);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent).subscribe(
        flights => {
          this.store.dispatch(new FlightsLoaded({flights}));
        },
        err => console.error('err loading', err)
      );
  }

  delay(): void {
    
    this.store.select(s => s.flightBooking.flights)
        .pipe(first()).subscribe(flights => {

          // IMMER: newFlight = produce((flight) => {flight.date = ...})

          const flight: Flight = flights[0];
          const date = new Date(flight.date);
          const newDate = new Date(date.getTime() + 15 * 1000 * 60);
          const newFlight = {...flight, date: newDate.toISOString()}

          this.store.dispatch(new UpdateFlight({flight: newFlight}));

    })


  }

}
