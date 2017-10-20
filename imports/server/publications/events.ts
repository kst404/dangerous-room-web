import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Log } from '../../modules';
import { drCollectionEvents } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/events', function(uuid): Mongo.Cursor<EventItem> {
  Log.debug('dangerous-room/events publish', uuid, this.connection.id);
  return drCollectionEvents.find({});
});

drCollectionEvents.deny({
    // insert: function () {
    //     return true;
    // },
    // update: function () {
    //     return true;
    // },
    // remove: function () {
    //     return true;
    // }
});

drCollectionEvents.allow({
    update: function (u,d) {
        Log.debug('Events update:',u,d);
        return true;
    },
    insert: function (u,d) {
        Log.debug('Events insert:',u,d);
        return true;
    },
    remove: function (u,d) {
        Log.debug('Events remove:',u,d);
        return true;
    }
});
