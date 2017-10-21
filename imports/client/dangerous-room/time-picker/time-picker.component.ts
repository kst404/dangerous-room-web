import {
    Component, EventEmitter, Input, Output, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import { BaseComponent } from '../../lib';

import template from './time-picker.component.html';
import style from './time-picker.component.scss';


/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const DR_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DRTimePickerComponent),
    multi: true
};

@Component({
    selector: 'dr-time-picker',
    providers: [DR_TIME_PICKER_CONTROL_VALUE_ACCESSOR],
    inputs: ['disabled', 'color','required', 'name', 'placeholder'],
    styles: [style],
    template
})
export class DRTimePickerComponent extends BaseComponent implements ControlValueAccessor {

    private _hours = 0;
    private _mins = 0;
    private _seconds;

    private get hours() { return this._hours }
    private set hours(v) {
        this._hours = v;
        this._seconds = (this._hours*60+this._mins)*60;
        this.onChange.next(this._seconds)
    }

    private get mins() { return this._mins }
    private set mins(v) {
        this._mins = v;
        this._seconds = (this._hours*60+this._mins)*60;
        this.onChange.next(this._seconds)
    }

    @Output()
    onChange: EventEmitter<any> = new EventEmitter();

    writeValue(value: any): void {
        if (value !== undefined && this._seconds != value) {
            this._seconds = value;
            let hoursRemains = value%3600;
            this._hours = (value - hoursRemains)/3600;
            this._mins = (hoursRemains-hoursRemains%60)/60;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange.subscribe(fn)
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState(isDisabled: boolean): void {

    }

}
