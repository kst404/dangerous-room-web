import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Twilio } from '../modules/twilio/twilio';

import { drCollectionEvents, drCollectionNotifications } from '../../collections';

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
    "dangerous-room/event/status": function (id, status) {
        console.log('dangerous-room/event/status: ${'+status+'} for id ${'+id+'}');
        check(id, String);
        check(status, String);
        let event = drCollectionEvents.findOne({_id: id});
        if (!event || !_.contains(['start','active','passive','stop'],status)) {
            console.log("dangerous-room/events/status: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }

        let message = {
            sessionId:this.connection.id,
            ts: Date.now(),
            message: {
                type: "event",
                status: status,
                event: event
            }
        };
        if(status == 'active') {
            console.log('Send SMS?');
            Twilio.sendSMS("Someone "+event.event_description);
        }
            // () => getMessage("event", status);
        return drCollectionNotifications.insert(message)
    }
});
