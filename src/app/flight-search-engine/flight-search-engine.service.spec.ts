import { TestBed } from '@angular/core/testing';

import { FlightSearchEngineService } from './flight-search-engine.service';

describe('FlightSearchEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightSearchEngineService = TestBed.get(FlightSearchEngineService);
    expect(service).toBeTruthy();
  });
});
