import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule, MatSliderModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatInputModule, MatButtonModule } from '@angular/material';

import { FlightSearchEngineComponent } from './flight-search-engine/flight-search-engine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        FlightSearchEngineComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatSliderModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
