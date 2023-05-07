import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxIvySliderModule } from '../../../ngx-ivy-slider/src/lib/components/ngx-ivy-slider.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxIvySliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
