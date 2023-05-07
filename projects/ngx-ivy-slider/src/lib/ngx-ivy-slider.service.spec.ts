import { TestBed } from '@angular/core/testing';

import { NgxIvySliderService } from './ngx-ivy-slider.service';

describe('NgxIvySliderService', () => {
  let service: NgxIvySliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIvySliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
