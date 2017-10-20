import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';

import { DangerousRoomService } from '../shared/dangerous-room.service';
import { BaseComponent } from '../../lib';

import template from './toolbar-content.component.html';
import style from './toolbar-content.component.scss';

@Component({
    selector: 'dr-toolbar-content',
    styles: [style],
    template
})
export class DRToolbarContentComponent extends BaseComponent {

    notifications = [];
    notifications_count=0;
    constructor(
        private _drService: DangerousRoomService,
        private _dialogService:TdDialogService,
        private _zone: NgZone
    ) {
        super();
        this.tracked = this._drService.getNotifications$.subscribe((n:any[])=>{
            this._zone.run(()=>{
                this.notifications=n;
                this.notifications_count=this.notifications.length;
            });
        })
    }

    get10Notifications(){
        return this.notifications.slice(0, 9);
    }
}
