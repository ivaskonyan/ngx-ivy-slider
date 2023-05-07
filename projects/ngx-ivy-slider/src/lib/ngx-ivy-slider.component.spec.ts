import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIvySliderComponent } from './ngx-ivy-slider.component';

describe('NgxIvySliderComponent', () => {
  let component: NgxIvySliderComponent;
  let fixture: ComponentFixture<NgxIvySliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxIvySliderComponent]
    });
    fixture = TestBed.createComponent(NgxIvySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
