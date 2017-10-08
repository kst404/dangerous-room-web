import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { drCollectionContacts } from '../../collections';

let fields = { fields: { telephone: 0, date: 1 } };

/** Publish all `Contacts`. */
Meteor.publish('dangerous-room/contacts', function(): Mongo.Cursor<ContactItem> {
  console.log('dangerous-room/contacts publish', Meteor.userId(), this.connection.id);
  return drCollectionContacts.find({});
});

drCollectionContacts.deny({
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

Meteor.methods({
    /**
     *
     * @param param
     */
    "dangerous-room/contacts/delete": function (id) {
        console.log("dangerous-room/contacts: param = " + JSON.stringify(id));

        check(id, String);
        let event = drCollectionContacts.findOne({_id: id});
        if (!event) {
            console.log("dangerous-room/contacts/delete: Can't find contact with id " + id);
            throw new Meteor.Error(500, "Can't find contact");
        }
        drCollectionContacts.remove({"_id": id});
    }
});
