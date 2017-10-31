import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Twilio } from '../modules/twilio/twilio';

import { Log } from '../../modules';
import { drCollectionEvents, drCollectionNotifications } from '../../collections';
import {drCollectionContacts} from "../../collections/contacts";

// let eventMessage = {
//         sessionId:this.connection.sessionId,
//         ts: Date.now(),
//         message: {
//             type: type,
//             status: status
//         }
// };

Meteor.methods({
    /**
     *
     * @param param
     */
    "dangerous-room/event/status": function (id, status, deviceId) {
        Log.debug('dangerous-room/event/status: ${'+status+'} for id ${'+id+'} deviceId:',deviceId);
        check(id, String);
        check(status, String);
        check(deviceId, String);

        let event = drCollectionEvents.findOne({_id: id, phoneID: deviceId});
        if (!event || !_.contains(['start','active','passive','stop','alarm'],status)) {
            Log.debug("dangerous-room/events/status: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }
        let contact = drCollectionContacts.findOne({phoneID: deviceId},{sort:{priority:1}});

        let message = {
            sessionId:this.connection.id,
            deviceId: deviceId,
            ts: Date.now(),
            message: {
                type: "event",
                status: status,
                event: event
            }
        };
        if(status == 'alarm') {
            Log.debug('Send SMS!', contact, "Someone "+event.event_description);
            Twilio.sendSMS(contact.telephone,"Someone "+event.event_description);
        }
            // () => getMessage("event", status);
        return drCollectionNotifications.insert(message)
    }
});
