import { Mongo } from 'meteor/mongo';

export const drCollectionNotifications: any = new Mongo.Collection<any>('Notifications');
