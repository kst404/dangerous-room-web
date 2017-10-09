import {
    Component,
    NgZone,
    OnInit,
    ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';

import { BaseComponent } from '../../lib';
import { DangerousRoomService } from '../shared';

import template from './event-edit.component.html';
import style from './event-edit.component.scss';


@Component({
    selector: 'dr-event-edit',
    styles: [style],
    template
})
export class DREventEditComponent extends BaseComponent implements OnInit {

    @ViewChild('eventForm')
    private eventForm:NgForm;

    private action;
    private event:EventItem = {
        _id: null,
        event_description: "",
        date: new Date(),
        duration: 0,
        completed: false
    };

    constructor (private _drService: DangerousRoomService,
                 private _dialogService:TdDialogService,
                 private _zone: NgZone,
                 private _route: ActivatedRoute,
                 private _snackBarService: MdSnackBar,
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
                    return this._drService.allEvents$.map((events:EventItem[]) => {
                        return events.find((e)=> e._id == params.id )
                    })
                }
                return Observable.of(null)
            })
            .subscribe((data) => {
                this._zone.run(() => {
                    if (data) {
                        this.event = data;
                    }
                });

                this.tracked = this.eventForm
                    .valueChanges
                    .debounceTime(1000)
                    .subscribe((v) => {
                        console.log(v,);
                        if(this.eventForm.valid) {
                            if(this.action == 'add') {

                                this._snackBarService.open('Event added', '', {duration: 2000});
                            } else {

                                this._snackBarService.open('Event saved', '', { duration: 2000 });
                            }
                        }
                    })
            });
    }

}
