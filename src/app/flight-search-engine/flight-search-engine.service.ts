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
            depart: new FormControl(searchCriteriaModel.depart || null, [Validators.required]),
            arrive: new FormControl(searchCriteriaModel.arrive || null, [Validators.required]),
            departDate: new FormControl(searchCriteriaModel.departDate || null, [Validators.required]),
            returnDate: new FormControl(searchCriteriaModel.returnDate || null),
            passenger: new FormControl(searchCriteriaModel.passenger || null, [Validators.required]),
        });

        return flightSearchForm;
    }

    // multiFilter(arr: Object[], filters: Object): any[] {
    //     const filterKeys = Object.keys(filters);
    //     return arr.filter(eachObj => {
    //         return filterKeys.every(eachKey => {
    //             if (!filters[eachKey].length) {
    //                 return true; // passing an empty filter means that filter is ignored.
    //             }
    //             return filters[eachKey].includes(eachObj[eachKey]);
    //         });
    //     });
    // }
}
