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

    public priceRange: 10000;

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

    onTabChange(event: any): void {
        this.tabSelected = event;
        this.flightSearchForm.reset();
        if (this.tabSelected === 0) {
            this.flightSearchForm.get('returnDate').clearValidators();
        } else if (this.tabSelected === 0) {
            this.flightSearchForm.get('returnDate').setValidators([Validators.required]);
        }
        this.flightListLocal = this.flightList;
    }

    onSearchClicked(): void {
        console.log(this.flightSearchForm.value);
        if (this.flightSearchForm.valid) {
            const searchCriteria = this.flightSearchForm.value;
            let flightListLocal = [];
            flightListLocal = this.flightList.filter((flight: Flight) => {
                console.log('flight.departDateTime: ', new Date(flight.oneWay.departDateTime).getTime());
                console.log('searchCriteria.departDate: ', new Date(searchCriteria.departDate).getTime());
                console.log(new Date(flight.oneWay.departDate).getTime() === new Date(searchCriteria.departDate).getTime());

                const flightDepartDate = new Date(flight.oneWay.departDateTime);
                flightDepartDate.setHours(0, 0, 0, 0);

                const flightReturnDate = this.tabSelected === 1 ? new Date(flight.return.departDateTime) : null;
                flightReturnDate.setHours(0, 0, 0, 0);

                if (this.tabSelected === 0) {
                    return flight.oneWay.depart === searchCriteria.depart &&
                        flight.oneWay.arrive === searchCriteria.arrive &&
                        flightDepartDate.getTime() === new Date(searchCriteria.departDate).getTime();
                } else if (this.tabSelected === 1) {
                    return flight.oneWay.depart === searchCriteria.depart &&
                        flight.return.depart === searchCriteria.arrive &&
                        flight.oneWay.arrive === searchCriteria.arrive &&
                        flight.return.arrive === searchCriteria.depart &&
                        flightDepartDate.getTime() === new Date(searchCriteria.departDate).getTime() &&
                        flightReturnDate.getTime() === new Date(searchCriteria.returnDate).getTime();
                }

            });
            this.flightListLocal = JSON.parse(JSON.stringify(flightListLocal));
        } else {
            (<any>Object).values(this.flightSearchForm.controls).forEach((ctrl: FormControl) => {
                ctrl.markAsTouched();
            });
        }
        this.changeDetectionRef.detectChanges();
    }

    onChangeSlider(): void {
        let flightListLocal = [];
        flightListLocal = this.flightList.filter((flight: Flight) => {
            if (this.tabSelected === 0) {
                return +flight.oneWay.amount <= this.priceRange;
            } else if (this.tabSelected === 1) {
                return +flight.return.amount <= this.priceRange;;
            }
        });
        this.flightListLocal = JSON.parse(JSON.stringify(flightListLocal));
        this.changeDetectionRef.detectChanges();
    }
}
