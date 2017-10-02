'use strict';

import { Meteor } from 'meteor/meteor';

import { FormGroup, FormArray, FormControl } from '@angular/forms';

import {
    Observable,
    Subscriber
} from 'rxjs';
import { SDTracking } from './tracking';

import { MeteorObservable } from './meteor.observable';

export class BasicService extends SDTracking {

    protected _submitting = false;

    protected formGroup:FormGroup;

    constructor (){
        super();
    }

    /**
     * Try to use MeteorCall instead
     * @param {string} name
     * @param args
     * @returns {Promise<any>}
     */
    protected promiseCall(name: string, ...args : any[]):Promise<any> {
        return new Promise( (resolve, reject) =>
            Meteor.call(name, ...args.concat([
                    (error: Meteor.Error, result) => {
                        error ? reject(error):resolve(result)
                    }
                ])
            ));
    }

    /**
     *
     * @returns {boolean}
     */
    public checkSubmit():boolean {
        this._submitting = true;
        let status = Meteor.status();
        if(!status['connected']) {
            this._submitting = false;
            console.log({ title: "There is no connection to the server, please repeat the request later.", message: status.reason});
        }
        return this._submitting;
    }

    /**
     *
     * @param form
     * @param value
     * @returns {{}}
     */
    protected makeData(form, value) {
        if( !form.dirty ) return;
        let uo = {};
        for(let k in value) {
            let f = form.controls[k];
            if( f && f instanceof FormControl && f.dirty && f.valid) {
                uo[k] = value[k];
            }
            if( f && f instanceof FormGroup && f.dirty) {
                uo[k] = this.makeData(f, value[k]);
            }
            if( f && f instanceof FormArray && f.dirty && f.valid) {
                uo[k] = value[k];
            }
        }
        return uo;
    }

    protected setFieldsFromDB(v, form?) {
        if ( !form ) form=this.formGroup;
        if ( !form ) return;
        if ( !v ) v=[];

        _.keys(form.controls)
            .forEach( k => {
                if (form.controls[k] instanceof FormControl)
                    form.controls[k].reset(v && v[k] || null, {onlySelf: false, emitEvent: false});

                if (form.controls[k] instanceof FormGroup)
                    this.setFieldsFromDB(v[k], form.controls[k]);

                if (form.controls[k] instanceof FormArray) {
                    let a = v && v[k] || [];
                    a.forEach( e => {
                        form.controls[k].push(new FormControl(e))
                    });
                }
            })
    }

    /**
     *
     * @returns {boolean}
     */
    formValid():boolean {
        return this.formGroup.valid;
    }

    /**
     *
     * @returns {FormGroup}
     */
    getForm():FormGroup {
        return this.formGroup;
    }

    protected MeteorSubscribeAutorun<T>(name: string, ...args: any[]): Observable<T> {
        return MeteorObservable.subscribeAutorun(name,...args);
    }

    protected MeteorCall<T>(name: string, ...args: any[]): Observable<T> {
        return MeteorObservable.call(name,...args);
    }

    protected MeteorApply<T>(name: string, args: EJSONable[], options?: {
        wait ? : boolean;
        onResultReceived ? : Function;
    }): Observable<T> {
        return MeteorObservable.apply(name, args, options);
    }
}
