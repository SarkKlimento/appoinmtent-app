import { TestBed } from '@angular/core/testing';

import { SalesforceRestCalloutService } from './salesforce-rest-callout.service';

describe('SalesforceRESTcalloutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesforceRestCalloutService = TestBed.get(SalesforceRestCalloutService);
    expect(service).toBeTruthy();
  });
});
