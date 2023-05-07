import { InjectionToken } from '@angular/core';
import { NgxIvySliderOptions } from '../types/ngx-ivy-slider.type';
import { NgxIvySliderComponent } from '../components/ngx-ivy-slider.component';

export const NgxIvySliderOptionsToken: InjectionToken<NgxIvySliderComponent> = new InjectionToken<NgxIvySliderOptions>(
  'NGX_IVY_SLIDER_OPTIONS'
);
