import { check } from 'meteor/check';

import { Log } from '../../modules';
import { drCollectionEvents,
    drCollectionContacts,
    drCollectionRooms } from '../../collections';

Meteor.methods({

    /** Insert default demo items to `Events` if collection is empty. */
    dbInit: function(): void {
        if (drCollectionEvents.find().count() === 0) {

            let defaultEvents: EventItem[] = [
                {
                    event_description: 'going to vivarium Room 6.149',
                    date: new Date(),
                    duration: 3600,
                    completed: false
                }, {
                    event_description: 'going to imaging Core Room',
                    date: new Date(),
                    duration: 3600,
                    completed: false
                }
            ];
            for (let item of defaultEvents) {
                drCollectionEvents.insert(item);
            }

            Log.debug(`[dbInit] Inserted ${drCollectionEvents.find().count()} documents to "Events". `);
        } else {
            Log.debug(`[dbInit] ${drCollectionEvents.find().count()} documents already exist in "Events". `);
        }
        if (drCollectionContacts.find().count() === 0) {

            let defaultContacts: ContactItem[] = [
                {
                    firstName: 'Homer',
                    lastName: 'Simpson',
                    telephone: '+1(513)1112233'
                }, {
                    firstName: 'Marge',
                    lastName: 'Simpson',
                    telephone: '+1(513)1112234'
                }, {
                    firstName: 'Bart',
                    lastName: 'Simpson',
                    telephone: '+1(513)1112235'
                }
            ];
            for (let item of defaultContacts) {
                drCollectionContacts.insert(item);
            }
            Log.debug(`[dbInit] Inserted ${drCollectionContacts.find().count()} documents to "Contacts". `);
        } else {
            Log.debug(`[dbInit] ${drCollectionContacts.find().count()} documents already exist in "Contacts". `);
        }
    }
});
