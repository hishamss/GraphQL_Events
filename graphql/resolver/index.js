const bookingResolver = require("./booking");
const eventsResolver = require("./events");
const userResolver = require("./users");

module.exports = {
  ...bookingResolver,
  ...eventsResolver,
  ...userResolver,
};
