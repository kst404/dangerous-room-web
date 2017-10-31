import { Component, NgZone, OnInit } from '@angular/core';
import { TdFadeInOutAnimation } from '@covalent/core';

import { DangerousRoomService } from '../../shared/dangerous-room.service';
import { BaseComponent } from '../../../lib';

import template from './notification-list.component.html';

@Component({
    selector: 'dr-notification-list',
    animations: [
        TdFadeInOutAnimation({anchor:'tdFadeInOut', duration: 1000})
    ],
    template
})
export class DRNotificationListComponent extends BaseComponent implements OnInit {

    private notifications = [];

    private notifColors = {
        'start': {
            color: 'accent',
            icon: 'info'
        },
        'active': {
            color: 'purple',
            icon: 'info'
        },
        'alarm': {
            color: 'warn',
            icon: 'info'
        },
        'passive': {
            color: 'primary',
            icon: 'info'
        },
        'stop': {
            color: 'primary',
            icon: 'info'
        }

    };


    constructor (private _drService: DangerousRoomService,
                 private _zone: NgZone
    ) {
        super();
    }

    ngOnInit(): void {
        this.tracked = this._drService.allNotifications$.subscribe((e) => {
            this._drService.resetNotifications();
            this._zone.run(() => {
                this.notifications = e;
            });
        });
    }

    getLabel(notif){
        return this._drService.getNotificationLabel(notif);
    }

    getSubLabel(notif) {
        if(notif.message.status == 'alarm')
            return "Someone "+notif.message.event.event_description+" did not respond ";
        return "";
    }
}
