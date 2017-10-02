import { check } from 'meteor/check';

import { drCollectionEvents, drCollectionRooms } from '../../collections';

Meteor.methods({

    /** Insert default demo items to `Events` if collection is empty. */
    dbInit: function(): void {
        if (drCollectionEvents.find().count() === 0) {

            let defaultEvents: EventItem[] = [
                {
                    description: 'going to vivarium Room 6.149',
                    date: new Date(),
                    duration: 3600,
                    completed: false
                }, {
                    description: 'going to imaging Core Room',
                    date: new Date(),
                    duration: 3600,
                    completed: false
                }
            ];

            for (let item of defaultEvents) {
                drCollectionEvents.insert(item);
            }

            console.log(`[dbInit] Inserted ${drCollectionEvents.find().count()} documents to "Events". `);
        } else {
            console.log(`[dbInit] ${drCollectionEvents.find().count()} documents already exist in "Events". `);
        }
    },

    // /**
    //  * Delete item from `Demos` collection which matching item ID.
    //  * @param {string} itemID - Item ID.
    //  */
    // deleteDemoItem: function(itemID: string): void {
    //     check(itemID, String);
    //     drCollectionEvents.remove({ _id: itemID });
    // },

    // /**
    //  * Upsert demo item.
    //  * @param {DemoItem} item - Demo item.
    //  * @param {string} itemID? - Item ID.
    //  */
    // upsertDemoItem: function(item: DemoItem, itemID?: string) {
    //     check(item, Object);
    //
    //     if (typeof itemID === 'string') {
    //         drCollectionEvents.update(itemID, {
    //             $set: {
    //                 description: item.description,
    //                 cost: item.cost,
    //                 detail: item.detail,
    //                 lastUpdatedAt: new Date()
    //             }
    //         }, (error) => { if (error) { throw new Meteor.Error(error); } });
    //     } else {
    //         drCollectionEvents.insert({
    //             description: item.description,
    //             cost: item.cost,
    //             detail: item.detail,
    //             createdAt: new Date()
    //         }, (error) => { if (error) { throw new Meteor.Error(error); } });
    //     }
    // }
});
