const express = require("express");
const app = express();
const PORT = 3000;
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const events = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Note: ! in garaphQL this means null is not allowed
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String! 
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String! 
    }
    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    // Resolver
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          // to make sure whatever I type will converted to number
          price: +args.eventInput.price,
          data: args.eventInput.data,
        };

        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`app is listening on Port ${PORT}`);
});
