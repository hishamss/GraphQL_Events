const express = require("express");
const app = express();
const PORT = 3000;
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const db = require("./models");
const bcrypt = require("bcrypt");
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

    type User {
        _id: ID!
        email: String!
        password: String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String! 
    }

    input UserInput {
        email: String!
        password: String!
    }
    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    // Resolver
    rootValue: {
      events: () => {
        return db.Events.find()
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
        return db.Events.create({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        })
          .then((result) => {
            console.log(result);
            // between the following curly braces is recommended from mongoDB to convert the id to string
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch((err) => console.log(err));
      },
      createUser: (args) => {
        return bcrypt
          .hash(args.userInput.password, 12)
          .then((hashedPassword) => {
            return db.Users.create({
              email: args.userInput.email,
              password: hashedPassword,
            })
              .then((result) => {
                //   add password: null to prevent the user from getting the password after creating new user
                return {
                  ...result._doc,
                  password: null,
                  _id: result._doc._id.toString(),
                };
              })
              .catch((err) => {
                if (
                  err.message.includes("E11000 duplicate key error collection")
                ) {
                  throw "User Already Exists";
                }
              });
          })
          .catch((err) => {
            throw err;
          });
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
