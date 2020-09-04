const bookingResolver = require("./booking");
const eventsResolver = require("./events");
const userResolver = require("./users");
const authUserResolver = require("./authUser");
module.exports = {
  ...bookingResolver,
  ...eventsResolver,
  ...userResolver,
  ...authUserResolver,
};
