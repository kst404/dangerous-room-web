import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionEvents } from '../../collections';

Meteor.methods({
    /**
     *
     * @param param
     */
    "dangerous-room/events/delete": function (id) {
        console.log("dangerous-room/events: param = " + JSON.stringify(id));
        // TODO
        // if (!Throttle.checkThenSet(this.connection.clientAddress+'_companyUpdate', 2, 120000)) {
        //     throw new Meteor.Error(500, 'Please wait at least 2m to try again');
        // }

        // TODO Check which roles do we exactly need in this case
        // if(!Roles.userIsInRole(this.userId, ['admin','billing','tech', 'editor'], Roles.GLOBAL_GROUP)) {
        //     throw new Meteor.Error(403, 'Access denied!');
        // }

        check(id, String);

        let event = drCollectionEvents.findOne({_id: id});
        if (!event) {
            console.log("dangerous-room/events/delete: Can't find event with id " + id);
            throw new Meteor.Error(500, "Can't find event");
        }

        drCollectionEvents.remove({"_id": id});
    }
});
