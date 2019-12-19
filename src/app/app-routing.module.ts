import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchEngineComponent } from './flight-search-engine/flight-search-engine.component';


const routes: Routes = [
    { path: 'flight-search', component: FlightSearchEngineComponent },
    {
        path: '',
        redirectTo: '/flight-search',
        pathMatch: 'full'
    },
    { path: '**', component: FlightSearchEngineComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
