import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionEvents } from '../../collections';

let fields = { fields: { description: 1, date: 1 } };

/** Publish all `Events`. */
Meteor.publish('dangerous-room/events', function(): Mongo.Cursor<EventItem> {
  return drCollectionEvents.find({});
});

// /** Publish `DemoItem` by ID. */
// Meteor.publish('demoItem', function(itemID: string): Mongo.Cursor<EventItem> {
//   check(itemID, String);
//
//   return Demos.collection.find({ _id: itemID });
// });
