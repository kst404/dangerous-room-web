import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Observable, Observer } from 'rxjs/Rx';

import { BasicService } from '../../lib';

import { drCollectionEvents, drCollectionRooms } from '../../../collections';

@Injectable()
export class DangerousRoomService extends BasicService {

    constructor() {
        super();
    }

    get allEvents$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/events',() => drCollectionEvents.find({}).fetch());
    }

    deleteEvent(itemID: string): void {
        Meteor.call('deleteDemoItem', itemID);
    }

    get allRooms$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/rooms',() => drCollectionRooms.find({}).fetch());
    }
}
