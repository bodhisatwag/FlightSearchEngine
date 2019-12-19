import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FlightSearchEngineService } from './flight-search-engine.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-flight-search-engine',
    templateUrl: './flight-search-engine.component.html',
    styleUrls: ['./flight-search-engine.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchEngineComponent implements OnInit {

    public flightSearchForm: FormGroup;

    constructor(
        private flightSearchEngineService: FlightSearchEngineService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.flightSearchForm = this.fb.group({
            originCity: [''],
            destinationCity: [''],
            departureDate: [''],
            returnDate: [''],
            passengers: ['']
        })
    }

}
