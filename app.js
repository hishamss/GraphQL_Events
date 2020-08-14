const express = require("express");
const app = express();
const PORT = 3000;
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/events");
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
        return Event.find()
          .then((result) => {
            return result.map((row) => {
              return { ...row._doc, _id: row._doc._id.toString() };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        return Event.create({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        })
          .then((result) => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch((err) => console.log(err));
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://localhost/graphql_events", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening on Port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
