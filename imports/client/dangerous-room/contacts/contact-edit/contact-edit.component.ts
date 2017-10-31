import {
    Component,
    NgZone,
    OnInit,
    ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';

import { BaseComponent } from '../../../lib';
import { DangerousRoomService } from '../../shared';

import template from './contact-edit.component.html';
import style from './contact-edit.component.scss';


@Component({
    selector: 'dr-event-edit',
    styles: [style],
    template
})
export class DRContactEditComponent extends BaseComponent implements OnInit {

    @ViewChild('contactForm')
    private contactForm:NgForm;

    private action;
    private contact:ContactItem = {
        _id: null,
        firstName: "",
        lastName: "",
        email: "",
        telephone: ""
    };

    constructor (private _drService: DangerousRoomService,
                 private _dialogService:TdDialogService,
                 private _zone: NgZone,
                 private _route: ActivatedRoute,
                 private _snackBarService: MatSnackBar,
    ) {
        super();
    }

    ngOnInit(): void {
        this.tracked = this._route.url.subscribe((url: any) => {
            this.action = (url.length > 1 ? url[1].path : 'add');
        });

        this.tracked = this._route.params
            .flatMap((params: {id: string}) => {
                if (this.id) {
                    return this._drService.allContacts$
                        .map((contacts:ContactItem[]) =>
                            contacts.find((e)=> e._id == params.id )
                        )
                }
                return Observable.of(null)
            })
            .subscribe((data) => {
                this._zone.run(() => {
                    if (data) {
                        this.contact = data;
                    }
                });
            });

        this.tracked = this.contactForm
            .valueChanges
            .debounceTime(1000)
            .subscribe((v) => {
                if(this.contactForm.valid && this.contactForm.dirty) {
                    if(this.action == 'add') {
                        this._snackBarService.open('Contact added', '', {duration: 2000});
                    } else {
                        this.tracked = this._drService.updateContact(this.contact).subscribe((e)=>{
                            this.contactForm.reset(this.contact);
                            this._zone.run(()=>{
                                let message = e?e.message:"";
                                this._snackBarService.open('Contact saved' + message, '', { duration: 2000 });

                            })
                        })
                    }
                }
            })

    }

}
