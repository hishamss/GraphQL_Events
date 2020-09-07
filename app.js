const express = require("express");
const app = express();
const PORT = 3001;
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolver");
const isAuth = require("./middlewares/is-auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(isAuth);
// Note: ! in garaphQL this means null is not allowed
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    // Resolver
    rootValue: graphQlResolvers,
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
