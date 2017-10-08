import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Observable, Observer } from 'rxjs/Rx';

import { BaseService } from '../../lib';

import { drCollectionEvents, drCollectionRooms } from '../../../collections';
import {drCollectionContacts} from "../../../collections/contacts";

@Injectable()
export class DangerousRoomService extends BaseService {

    constructor() {
        super();
    }

    get allEvents$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/events',() => drCollectionEvents.find({}).fetch());
    }

    deleteEvent(itemID: string): void {
        Meteor.call('dangerous-room/events/delete', itemID);
    }

    get allRooms$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/rooms',() => drCollectionRooms.find({}).fetch());
    }

    get allContacts$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/contacts',() => drCollectionContacts.find({}).fetch());
    }

    deleteContact(itemID: string): void {
        Meteor.call('dangerous-room/contacts/delete', itemID);
    }
}
