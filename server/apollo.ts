import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from '../imports/apollo/schema';

import { drCollectionEvents } from '../imports/collections/events';
import { drCollectionContacts } from '../imports/collections/contacts';

const resolvers = {
  Query: {
    events(root, args, context) {
      return drCollectionEvents.find({phoneID: args.phoneID}).fetch();
    },
    contacts(root, args, context) {
      return drCollectionContacts.find({phoneID: args.phoneID}).fetch();
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
});
