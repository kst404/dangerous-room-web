import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionEvents } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/events', function(): Mongo.Cursor<EventItem> {
  console.log('dangerous-room/events publish', Meteor.userId(), this.connection.id);
  return drCollectionEvents.find({});
});

drCollectionEvents.deny({
    // insert: function () {
    //     return true;
    // },
    // update: function () {
    //     return true;
    // },
    remove: function () {
        return true;
    }
});

drCollectionEvents.allow({
    update: function () {
        console.log('Update came?');
        return true;
    }
});
