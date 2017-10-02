import { Mongo } from 'meteor/mongo';

export const drCollectionRooms: any = new Mongo.Collection<any>('rooms');
