import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FlightSearchEngineService } from './flight-search-engine.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Flight } from './flight-search-engine.entities';

@Component({
    selector: 'app-flight-search-engine',
    templateUrl: './flight-search-engine.component.html',
    styleUrls: ['./flight-search-engine.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchEngineComponent implements OnInit, OnDestroy {

    private _subs: Subscription[] = [];

    public flightSearchForm: FormGroup;
    public flightList: Flight[] = [];

    constructor(
        private flightSearchEngineService: FlightSearchEngineService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this._subs.push(this.flightSearchEngineService.getFlights().subscribe((response: Flight[]) => {
            this.flightList = response;
        }))

        this.flightSearchForm = this.fb.group({
            originCity: [''],
            destinationCity: [''],
            departureDate: [''],
            returnDate: [''],
            passengers: ['']
        });
    }

    ngOnDestroy() {
        if (this._subs && this._subs.length > 0) {
            this._subs.forEach((sub: Subscription) => {
                sub.unsubscribe();
            })
            this._subs = [];
        }
    }

}
