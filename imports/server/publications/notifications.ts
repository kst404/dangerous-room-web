import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionNotifications } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/notifications', function(): Mongo.Cursor<any> {
  console.log('dangerous-room/notifications publish', this.connection.id);
  return drCollectionNotifications.find({}, {
        sort: {
            ts: -1
        },
        limit: 50
    });
});

drCollectionNotifications.deny({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

