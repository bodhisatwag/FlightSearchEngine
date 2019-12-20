import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Flight } from './flight-search-engine.entities';

@Injectable({
    providedIn: 'root'
})
export class FlightSearchEngineService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getFlights() {
        return this.httpClient.get('/assets/json/flights.json').pipe(map((response: Flight) => {
            return response != null ? response : null;
        }));
    }
}
