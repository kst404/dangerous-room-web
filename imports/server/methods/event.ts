import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionEvents, drCollectionNotifications } from '../../collections';

function getMessage(type, status) {
    return {
        sessionId:this.connection.sessionId,
        ts: Date.now(),
        message: {
            type: type,
            status: status
        }
    }
}

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
            // () => getMessage("event", status);
        return drCollectionNotifications.insert(message)
    },

    /**
     *
     * @param param
     */
    "dangerous-room/event/start": function (id) {
        console.log("dangerous-room/event/start: param = " + JSON.stringify(id));
        check(id, String);
        let event = drCollectionEvents.findOne({_id: id});
        if (!event) {
            console.log("dangerous-room/events/start: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }

        let message = getMessage("event", "start");
        return drCollectionNotifications.insert(message)

    },
    /**
     *
     * @param param
     */
    "dangerous-room/event/active": function (id) {
        console.log("dangerous-room/event/start: param = " + JSON.stringify(id));
        check(id, String);
        let event = drCollectionEvents.findOne({_id: id});
        if (!event) {
            console.log("dangerous-room/events/active: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }

        let message = getMessage("event", "active");
        return drCollectionNotifications.insert(message)
    },
    /**
     *
     * @param param
     */
    "dangerous-room/event/passive": function (id) {
        console.log("dangerous-room/event/passive: param = " + JSON.stringify(id));
        check(id, String);
        let event = drCollectionEvents.findOne({_id: id});
        if (!event) {
            console.log("dangerous-room/events/delete: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }

        let message = getMessage("event", "passive");
        return drCollectionNotifications.insert(message)
    }

});
