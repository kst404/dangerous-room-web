import { Component, NgZone, OnInit } from '@angular/core';
import { TdFadeInOutAnimation } from '@covalent/core';

import { DangerousRoomService } from '../shared/dangerous-room.service';
import { BaseComponent } from '../../lib';

import template from './notifications.component.html';

@Component({
    selector: 'dr-notifications',
    animations: [
        TdFadeInOutAnimation({anchor:'tdFadeInOut', duration: 1000})
    ],
    template
})
export class DRNotificationsComponent extends BaseComponent implements OnInit {

    private notifications = [];

    constructor (private _drService: DangerousRoomService,
                 private _zone: NgZone
    ) {
        super();
    }

    ngOnInit(): void {
        let x = null;
        this.tracked = this._drService.allNotifications$.subscribe((e) => {
                this._zone.run(() => {
                    this.notifications = this._drService.getLastNotifications(e);
                });
        });
    }

}
