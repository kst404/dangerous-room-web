import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Log } from '../../modules';
import { drCollectionEvents } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/events', function(uuid): Mongo.Cursor<EventItem> {
    check(uuid,Match.Optional(String));
    Log.debug('dangerous-room/events publish', uuid, this.connection.id);
    let filter = {};
    if(uuid)
        filter = {phoneID: uuid};
    return drCollectionEvents.find(filter);
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
    update: function (u,from,fields,to) {
        Log.debug('Events update:',u,from,fields,to);
        return true;
    },
    insert: function (u,from,fields,to) {
        Log.debug('Events insert:',u,from,fields,to);
        return true;
    },
    remove: function (u,from,fields,to) {
        Log.debug('Events remove:',u,from,fields,to);
        return true;
    }
});
