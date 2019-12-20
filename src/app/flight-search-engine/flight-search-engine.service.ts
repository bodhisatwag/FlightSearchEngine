import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Flight, Passenger } from './flight-search-engine.entities';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FlightSearchEngineService {

    constructor(
        private httpClient: HttpClient,
        private fb: FormBuilder
    ) { }

    getFlights(): Observable<Flight[]> {
        return this.httpClient.get('/assets/json/flights.json').pipe(map((response: Flight[]) => {
            return response != null ? response : null;
        }));
    }

    getPassengers(): Observable<Passenger[]> {
        return this.httpClient.get('/assets/json/passengers.json').pipe(map((response: Passenger[]) => {
            return response != null ? response : null;
        }));
    }

    generateFlightSearchForm(): FormGroup {
        let flightSearchForm: FormGroup = this.fb.group({
            originCity: new FormControl(null, [Validators.required]),
            destinationCity: new FormControl(null, [Validators.required]),
            departureDate: new FormControl(null, [Validators.required]),
            returnDate: new FormControl(null, [Validators.required]),
            passenger: new FormControl(null, [Validators.required])
        });

        return flightSearchForm;
    }
}
