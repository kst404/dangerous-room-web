import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { Log } from '../../modules';
import { drCollectionNotifications } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/notifications/new', function(): Mongo.Cursor<any> {
    Log.debug('dangerous-room/notifications/new publish', this.connection.id);
    let _scheduler = null;

    const handle = drCollectionNotifications.find({"showed":{$exists: false}}).observeChanges({
        added: (id,doc) => {
            Log.debug('dangerous-room/notifications publish added',id,doc);
            Meteor.setTimeout(()=>{
                drCollectionNotifications.update({"_id":id},{ $set: { "showed": true } })
            },15000);
        }
    });
    this.onStop(()=>{
        handle.stop();
    });
    return drCollectionNotifications.find({"showed":{$exists:false}}, {
        sort: {
            ts: -1
        },
        limit: 10
    });
});

Meteor.publish('dangerous-room/notifications/all', function(): Mongo.Cursor<any> {
    Log.debug('dangerous-room/notifications/all publish', this.connection.id);

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

