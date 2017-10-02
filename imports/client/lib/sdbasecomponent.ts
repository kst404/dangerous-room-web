import { Random } from 'meteor/random';

import { Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { SDTracking } from './tracking';

export class SDBaseComponent extends SDTracking implements OnDestroy {
    id = Random.id();

    protected _showError;
    protected _submitting:boolean = false;

    constructor() {
        super();
    }

    /**
     *  Functions to provide error support
     * @param comp
     * @returns {boolean}
     */
    isInvalid(comp):any {
        if(comp && comp instanceof FormControl && comp.errors )
            return !!this._showError && comp.errors;

        if(comp && comp instanceof FormGroup)
            return !!this._showError && !comp.valid;

        return false;
    }

    /**
     *
     * @param comp
     * @returns {string}
     */
    invalidMessage(comp:any) {
        if(comp && comp instanceof FormControl && comp.errors)
            return comp.errors.message;
        return "You have some errors in the form. Please fix them.";
    }

    /**
     *
     * @param comp
     * @returns {any}
     */
    invalidStyle(comp) {
        if(!!comp.valid||!this._showError)
            return '';
        else
            return 'has-error';
    }

    back() {
        window.history.back();
    }


    checkSubmit():boolean {
        this._submitting = true;
        let status = Meteor.status();
        if(!status['connected']) {
            this._submitting = false;
            console.log({   title: 'Can\'t connect to the server.', type: 'error', text: status.reason,  timer: 3000 });
        }
        return this._submitting;
    }

    dateFormat(d) {
        var date= new Date(d);
        var r=[];
        r.push(("00"+date.getDate()).slice(-2));
        r.push(("00"+(date.getMonth()+1)).slice(-2));
        r.push(date.getFullYear());
        return r.join("/");
    }

}
