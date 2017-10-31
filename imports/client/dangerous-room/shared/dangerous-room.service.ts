import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Observable, Observer } from 'rxjs/Rx';

import { BaseService } from '../../lib';

import {
    drCollectionEvents,
    drCollectionRooms,
    drCollectionContacts,
    drCollectionNotifications
} from '../../../collections';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DangerousRoomService extends BaseService {

    private _notifications = {};
    private _notifications$ = new BehaviorSubject(null);
    private notifications = [];

    constructor() {
        super();
        this.tracked = this.allNotifications$.subscribe((e) => this.getLastNotifications(e));
    }

    /**
     *  EVENTS
     */

    get allEvents$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/events',() => drCollectionEvents.find({},{sort:{date:-1}}).fetch());
    }

    deleteEvent(itemID: string): void {
        Meteor.call('dangerous-room/events/delete', itemID);
    }

    updateEvent(event): Observable<any> {
        let _obs = new Subject();
        drCollectionEvents.update({"_id":event._id},{$set:_.omit(event,['_id'])},(e)=>_obs.next(e));
        return _obs.asObservable();
    }

    insertEvent(event): Observable<any> {
        let _obs = new Subject();
        //TODO: how to deal with this???
        let _iid = drCollectionEvents.insert(_.omit(event,['_id']),(e,id)=>_obs.next({e:e, id:id}));
        _obs.next({e:null, id:+_iid});
        return _obs.asObservable();
    }

    /**
     *  ROOMS
     */
    get allRooms$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/rooms',() => drCollectionRooms.find({}).fetch());
    }

    /**
     *  CONTACTS
     */
    /**
     *
     * @returns {Observable<any[]>}
     */
    get allContacts$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/contacts',() => drCollectionContacts.find({},{sort:{priority:1}}).fetch());
    }

    updateContact(contact): Observable<any> {
        let _obs = new Subject();
        drCollectionContacts.update({"_id":contact._id},{$set:_.omit(contact,['_id'])},(e)=>_obs.next(e));
        return _obs.asObservable();
    }

    deleteContact(itemID: string): void {
        Meteor.call('dangerous-room/contacts/delete', itemID);
    }

    /**
     *  NOTIFICATIONS
     */

    get allNotifications$():Observable<any[]> {
        return this.MeteorSubscribeAutorun('dangerous-room/notifications/new',
            () => drCollectionNotifications
                .find({"showed":{$exists:false}},{sort:{ts:-1}})
                .fetch()
        );
    }

    getLastNotifications(e?):any[] {
        if(e && e.length > 0 && !_.find(this.notifications,(n) => n["_id"] == e[0]["_id"])) {

            e[0]['timeToShow'] = true;
            this.notifications.unshift(e[0]);

            Meteor.setTimeout(() => {
                e[0]['timeToShow'] = false;
            },5000);
        }
        this._notifications$.next(this.notifications);
        return this.notifications;
    }

    /**
     * @returns {Observable<any>}
     */
    get getNotifications$() {
        return this._notifications$.filter(_ => !!_);
    }

    public getNotificationLabel(notif) {
        switch(notif.message.status){
            case "start":
                return "Someone "+notif.message.event.event_description+"!";
            case "active":
                return "A person has 10 sec to respond";
            case "alarm":
                return "ALARM! ALARM! Notification has been sent!";
            case "passive":
                return "Same person has responded";
            case "stop":
                return notif.message.event.event_description+" - completed";
        }

    }

}
