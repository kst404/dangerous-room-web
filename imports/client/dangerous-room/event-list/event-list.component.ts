import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';
import { TdFadeInOutAnimation } from '@covalent/core';

import { DangerousRoomService } from '../shared/dangerous-room.service';

import { BaseComponent } from '../../lib';

import template from './event-list.component.html';
import style from './event-list.component.scss';

@Component({
    selector: 'dr-event-list',
    styles: [style],
    animations: [
        TdFadeInOutAnimation({anchor:'tdFadeInOut', duration: 1000})
    ],
    template
})
export class DREventListComponent extends BaseComponent implements OnInit {

    private event_list:EventItem[];

    private notifications: any[];

    constructor (private _drService: DangerousRoomService,
                 private _dialogService:TdDialogService,
                 private _zone: NgZone
    ) {
        super();
    }

    ngOnInit(): void {
        this.tracked = this._drService.allEvents$.subscribe((e) => {
            this._zone.run(() => {
                this.event_list = e;
                console.log(e);
            });
        });
        this.tracked = this._drService.allNotifications$.subscribe((e) => {
            this._zone.run(() => {
                this.notifications = e;
            });
            Meteor.setTimeout(() => {
                this._zone.run(() => {
                    this.notifications = this.notifications.map( n => {
                        n['timeToShow'] = false;
                        return n;
                    });
                });
            },3000);
        });
    }

    onDeleteItem(itemID: string): void {
        this._dialogService.openConfirm({
            "title": "Delete an event?",
            "message": "Please confirm!"

        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this._drService.deleteEvent(itemID);
            }
        });
    }
}
