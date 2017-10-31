import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';

import { DangerousRoomService } from '../../shared/dangerous-room.service';

import { BaseComponent } from '../../../lib';

import template from './contact-list.component.html';
import style from './contact-list.component.scss';

@Component({
    selector: 'dr-contact-list',
    styles: [style],
    template
})
export class DRContactListComponent extends BaseComponent implements OnInit {

    private contact_list:ContactItem[];

    constructor (private _drService: DangerousRoomService,
                 private _dialogService:TdDialogService,
                 private _zone: NgZone
    ) {
        super();
    }

    ngOnInit(): void {
        this._drService.allContacts$.subscribe((e) => {
            this._zone.run(() => {
                this.contact_list = e;
                console.log(e);
            });
        });
    }

    onDeleteItem(itemID: string): void {
        this._dialogService.openConfirm({
            "title": "Delete an contact?",
            "message": "Please confirm!"

        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this._drService.deleteContact(itemID);
            }
        });
    }
}
