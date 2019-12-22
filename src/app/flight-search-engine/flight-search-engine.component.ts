import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FlightSearchEngineService } from './flight-search-engine.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Flight, Passenger, SearchCriteria } from './flight-search-engine.entities';

@Component({
    selector: 'app-flight-search-engine',
    templateUrl: './flight-search-engine.component.html',
    styleUrls: ['./flight-search-engine.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchEngineComponent implements OnInit, OnDestroy {

    private _subs: Subscription[] = [];
    private searchCriteriaModel: SearchCriteria;

    public flightSearchForm: FormGroup;
    public flightList: Flight[] = [];
    public flightListLocal: Flight[] = [];
    public passengerList: Passenger[] = [];
    public tabSelected = 0;
    public priceRange: number;

    constructor(
        private flightSearchEngineService: FlightSearchEngineService,
        private changeDetectionRef: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this._subs.push(this.flightSearchEngineService.getFlights().subscribe((response: Flight[]) => {
            this.flightList = response;
            this.flightListLocal = this.flightList;
        }));

        this._subs.push(this.flightSearchEngineService.getPassengers().subscribe((response: Passenger[]) => {
            this.passengerList = response;
        }));

        this.searchCriteriaModel = {
            depart: null,
            arrive: null,
            departDate: null,
            returnDate: null,
            passenger: null,
        };

        this.flightSearchForm = this.flightSearchEngineService.generateFlightSearchForm(this.searchCriteriaModel);

        this.flightSearchForm.valueChanges.subscribe((item: any) => {
            console.log(item);
            // var flightListLocal = [];
            // flightListLocal = this.flightList.filter((flight: Flight) => {
            //     return flight.depart === item.originCity;
            // });
            // this.flightListLocal = JSON.parse(JSON.stringify(flightListLocal));
            this.changeDetectionRef.detectChanges();

        });

        // this.flightSearchForm.get('originCity').valueChanges.subscribe((item) => {
        //     var flightListLocal = [];
        //     flightListLocal = this.flightList.filter((flight: Flight) => {
        //         return flight.depart === item;
        //     });
        //     this.flightListLocal = JSON.parse(JSON.stringify(flightListLocal));
        //     this.changeDetectionRef.detectChanges();
        // });

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

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
    }
}
