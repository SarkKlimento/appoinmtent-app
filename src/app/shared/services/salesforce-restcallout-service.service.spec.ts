import { TestBed } from '@angular/core/testing';

import { SalesforceRESTcalloutServiceService } from './salesforce-restcallout-service.service';

describe('SalesforceRESTcalloutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesforceRESTcalloutServiceService = TestBed.get(SalesforceRESTcalloutServiceService);
    expect(service).toBeTruthy();
  });
});
