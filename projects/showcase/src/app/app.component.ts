import { Component } from '@angular/core';
import { PipsMode } from 'nouislider';
import { NgxIvySliderOptions } from '../../../ngx-ivy-slider/src/lib/types/ngx-ivy-slider.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly defaultPips: NgxIvySliderOptions['pips'];
  public disabled: boolean;
  public pips?: NgxIvySliderOptions['pips'];

  constructor() {
    this.disabled = false;
    this.defaultPips = {
      mode: PipsMode.Positions,
      values: [0, 25, 50, 75, 100],
      stepped: true,
    };
    this.pips = this.defaultPips;
  }

  public onSliderUpdate($event: any) {
    console.log('onSliderUpdate', $event);
  }

  public toggleDisabled() {
    this.disabled = !this.disabled;
  }

  togglePips() {
    this.pips = this.pips === this.defaultPips ? undefined : this.defaultPips;
  }
}
