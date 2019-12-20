import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Flight, Passenger, SearchCriteria } from './flight-search-engine.entities';
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

    generateFlightSearchForm(searchCriteriaModel: SearchCriteria): FormGroup {
        let flightSearchForm: FormGroup = this.fb.group({
            originCity: new FormControl(searchCriteriaModel.originCity || null, [Validators.required]),
            destinationCity: new FormControl(searchCriteriaModel.destinationCity || null, [Validators.required]),
            departureDate: new FormControl(searchCriteriaModel.departureDate || null, [Validators.required]),
            returnDate: new FormControl(searchCriteriaModel.returnDate || null, [Validators.required]),
            passenger: new FormControl(searchCriteriaModel.passenger || null, [Validators.required]),
        });

        return flightSearchForm;
    }
}
