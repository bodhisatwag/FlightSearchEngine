import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Flight, Passenger } from './flight-search-engine.entities';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FlightSearchEngineService {

    constructor(
        private httpClient: HttpClient
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
}
