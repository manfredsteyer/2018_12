import { Observable, interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, combineLatest, startWith, map, distinctUntilChanged, tap, withLatestFrom, filter, share, refCount, shareReplay, mergeMap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-lookahaed',
  templateUrl: './lookahaed.component.html',
  styleUrls: ['./lookahaed.component.css']
})
export class LookahaedComponent implements OnInit {

  formControl = new FormControl();

  input$: Observable<string> = this.formControl.valueChanges;
  flights$: Observable<Flight[]>
  online$: Observable<boolean>;

  constructor(private flightService: FlightService) { }

  ngOnInit() {

    this.online$ 
            = interval(2000).pipe(
                    startWith(0),
                    map(_ => Math.random() < 0.5),
                    distinctUntilChanged(), 
                    shareReplay(1)
            );

    this.flights$ = this.input$.pipe(
      debounceTime(300),
      combineLatest(this.online$),
      map(tupel => ({input: tupel[0], online: tupel[1]})),
      filter(obj => obj.online),
      map(obj => obj.input),
      switchMap(value => this.flightService.find(value, ''))
    );

    //this.input$.subscribe(v => console.debug('input', v));
  }

}
