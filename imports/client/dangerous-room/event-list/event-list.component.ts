import {Component, NgZone, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TdDialogService } from '@covalent/core';

import { DangerousRoomService } from '../shared/dangerous-room.service';

import template from './event-list.component.html';
import style from './event-list.component.scss';

@Component({
  styles: [style],
  template
})
export class DREventComponent implements OnInit {

  private event_list;
  private showAddItemForm: boolean = false;

  constructor (private _drService: DangerousRoomService,
               private _dialogService:TdDialogService,
               private _zone: NgZone
  ) {
  }

  ngOnInit(): void {
    this._drService.allEvents$.subscribe((e) => {
      this._zone.run(() => {
          this.event_list = e;
          console.log(e);
      });
    });
  }

  onDeleteItem(itemID: string): void {
    this._drService.deleteEvent(itemID);
  }

  onHideAddEventForm(value: boolean): void {
    this.showAddItemForm = value;
  }

  onShowAddEventForm(): void {
    // this._dialogService.openAlert({title:'test',message:'Form to show'});
    this.showAddItemForm = true;
  }
}
