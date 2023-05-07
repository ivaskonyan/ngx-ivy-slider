import * as noUiSlider from 'nouislider';

export interface NgxIvySliderOptions extends noUiSlider.Options {
  behaviour?: 'drag' | 'drag-all' | 'tap' | 'fixed' | 'snap' | 'unconstrained' | 'none';
}
export interface NgxIvySliderInstance extends noUiSlider.API {}
