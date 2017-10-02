import { Mongo } from 'meteor/mongo';

export const drCollectionEvents: any = new Mongo.Collection<any>('events');
