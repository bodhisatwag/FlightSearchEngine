import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FlightSearchEngineService } from './flight-search-engine.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Flight, Passenger } from './flight-search-engine.entities';

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
    public passengerList: Passenger[] = [];

    constructor(
        private flightSearchEngineService: FlightSearchEngineService,
        private changeDetectionRef: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this._subs.push(this.flightSearchEngineService.getFlights().subscribe((response: Flight[]) => {
            this.flightList = response;
        }));

        this._subs.push(this.flightSearchEngineService.getPassengers().subscribe((response: Passenger[]) => {
            this.passengerList = response;
        }));

        this.flightSearchForm = this.flightSearchEngineService.generateFlightSearchForm();

        this.changeDetectionRef.detectChanges();
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
