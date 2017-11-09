export const typeDefs = [`
  type Event {
    duration: Int
    event_description: String
    date: String
  }

  type Contact {
    id: String
    firstName: String
    lastName: String
    telephone: String
    priority: Int
  }

  type Query {
      events(phoneID: String): [Event]
      contacts(phoneID: String): [Contact]
  }

  schema {
    query: Query
  }
`];
