import { Mongo } from 'meteor/mongo';

export const drCollectionContacts: any = new Mongo.Collection<any>('Contacts');
