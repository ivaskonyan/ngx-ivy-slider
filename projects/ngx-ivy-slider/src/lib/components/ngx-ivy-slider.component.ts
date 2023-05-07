import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as noUiSlider from 'nouislider';
import { NgxIvySliderInstance, NgxIvySliderOptions } from '../types/ngx-ivy-slider.type';
import { NgxIvySliderOptionsToken } from '../tokens/ngx-ivy-slider-options.token';

@Component({
  selector: 'ngx-ivy-slider',
  template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxIvySliderComponent,
      multi: true,
    },
  ],
})
export class NgxIvySliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() disabled: boolean;
  @Input() public behaviour: NgxIvySliderOptions['behaviour'];
  @Input() public connect: NgxIvySliderOptions['connect'];
  @Input() public limit: NgxIvySliderOptions['limit'];
  @Input() public min: NgxIvySliderOptions['range']['min'];
  @Input() public max: NgxIvySliderOptions['range']['max'];
  @Input() public snap: NgxIvySliderOptions['snap'];
  @Input() public animate: NgxIvySliderOptions['animate'];
  @Input() public animationDuration: NgxIvySliderOptions['animationDuration'];
  @Input() public range: NgxIvySliderOptions['range'];
  @Input() public step: NgxIvySliderOptions['step'];
  @Input() public format: NgxIvySliderOptions['format'];
  @Input() public keyboardSupport: NgxIvySliderOptions['keyboardSupport'];
  @Input() public documentElement: NgxIvySliderOptions['documentElement'];
  @Input() public cssPrefix: NgxIvySliderOptions['cssPrefix'];
  @Input() public cssClasses: NgxIvySliderOptions['cssClasses'];
  @Input() public tooltips: NgxIvySliderOptions['tooltips'];
  @Input() public ariaFormat: NgxIvySliderOptions['ariaFormat'];
  @Input() public keyboardPageMultiplier: NgxIvySliderOptions['keyboardPageMultiplier'];
  @Input() public keyboardDefaultStep: NgxIvySliderOptions['keyboardDefaultStep'];
  @Input() public keyboardMultiplier: NgxIvySliderOptions['keyboardMultiplier'];
  @Input() public start: NgxIvySliderOptions['start'];
  @Input() public margin: NgxIvySliderOptions['margin'];
  @Input() public padding: NgxIvySliderOptions['padding'];
  @Input() public pips: NgxIvySliderOptions['pips'];

  @Output() public onSliderChange: EventEmitter<any> = new EventEmitter(true);
  @Output() public onSliderUpdate: EventEmitter<any> = new EventEmitter(true);
  @Output() public onSliderSlide: EventEmitter<any> = new EventEmitter(true);
  @Output() public onSliderSet: EventEmitter<any> = new EventEmitter(true);
  @Output() public onSliderStart: EventEmitter<any> = new EventEmitter(true);
  @Output() public onSliderEnd: EventEmitter<any> = new EventEmitter(true);

  public slider?: NgxIvySliderInstance;
  public handles: HTMLElement[];
  private onChange: any = Function.prototype;

  constructor(
    @Optional() @Inject(NgxIvySliderOptionsToken) private config: NgxIvySliderOptions,
    private renderer2: Renderer2,
    private ngZone: NgZone,
    private el: ElementRef<HTMLDivElement>
  ) {
    this.disabled = false;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.range = {
      min: this.min,
      max: this.max,
    };
    this.handles = [];
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div') as HTMLDivElement, this.getOptions());
    });

    this.slider?.on('set', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderSet.emit(values));
    });

    this.slider?.on('update', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderUpdate.emit(values));
    });

    this.slider?.on('change', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderChange.emit(values));
    });

    this.slider?.on('slide', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderSlide.emit(values));
    });

    this.slider?.on('start', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderStart.emit(values));
    });

    this.slider?.on('end', (values: (string | number)[], handle: number, unencoded: number[]) => {
      this.ngZone.run(() => this.onSliderEnd.emit(values));
    });

    this.handles = Array.from(this.el.nativeElement.querySelectorAll('.noUi-handle'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.slider && (changes['min'] || changes['max'] || changes['step'] || changes['range'])) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.slider?.updateOptions(
            {
              range: Object.assign(
                {},
                {
                  min: this.min,
                  max: this.max,
                },
                this.range || {}
              ),
              step: this.step,
            },
            true
          );
        });
      });
    }
  }

  ngOnDestroy(): void {}

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.renderer2.setAttribute(this.el.nativeElement.childNodes[0], 'disabled', 'true')
      : this.renderer2.removeAttribute(this.el.nativeElement.childNodes[0], 'disabled');
  }

  writeValue(obj: any): void {}

  private getOptions(): NgxIvySliderOptions {
    return Object.assign(this.config ?? {}, {
      behaviour: (this.behaviour ?? this.config?.behaviour),
      connect: this.connect ?? this.config?.connect,
      limit: this.limit ?? this.config?.limit,
      range: this.range ?? this.config?.range,
      step: this.step ?? this.config?.step,
      start: this.start ?? this.config?.start ?? 1,
      margin: this.margin ?? this.config?.margin,
      padding: this.padding ?? this.config?.padding,
      pips: this.pips ?? this.config?.pips,
      tooltips: this.tooltips ?? this.config?.tooltips,
      ariaFormat: this.ariaFormat ?? this.config?.ariaFormat,
      keyboardPageMultiplier: this.keyboardPageMultiplier ?? this.config?.keyboardPageMultiplier,
      keyboardDefaultStep: this.keyboardDefaultStep ?? this.config?.keyboardDefaultStep,
      keyboardMultiplier: this.keyboardMultiplier ?? this.config?.keyboardMultiplier,
      format: this.format ?? this.config?.format,
      animate: this.animate ?? this.config?.animate,
      animationDuration: this.animationDuration ?? this.config?.animationDuration,
      snap: this.snap ?? this.config?.snap,
      cssPrefix: this.cssPrefix ?? this.config?.cssPrefix,
      cssClasses: this.cssClasses ?? this.config?.cssClasses,
      documentElement: this.documentElement ?? this.config?.documentElement,
      keyboardSupport: this.keyboardSupport ?? this.config?.keyboardSupport,
    });
  }
}
