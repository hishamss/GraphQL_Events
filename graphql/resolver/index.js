const db = require("../../models");
const bcrypt = require("bcrypt");
module.exports = {
  users: async () => {
    try {
      let result = await db.Users.find().populate("createdEvents");
      return result.map((row) => {
        return {
          ...row._doc,
          password: null,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  events: async () => {
    try {
      let results = await db.Events.find().populate("creator");
      return results.map((row) => {
        return {
          ...row._doc,
          date: new Date(row._doc.date).toISOString(),
          creator: {
            ...row._doc.creator._doc,
            password: null,
          },
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookings: async() => {
    try {
      var results = await db.Booking.find();
      return results.map(booking => {
        return {...booking._doc,
        createdAt: new date(booking._doc.createdAt).toISOString(),
        updatedAt: new date(booking._doc.updatedAt).toISOString()
      }
      })
    } catch(err) {
      throw err;
    }
  }
  createEvent: async (args) => {
    try {
      var result = await db.Events.create({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5f371e5b4d07a27630b64c64",
      });
      try {
        var userResult = await db.Users.findOneAndUpdate(
          { _id: "5f371e5b4d07a27630b64c64" },
          //   Note: mongoose will only get the id of the new added event object and push it to createdEvents array
          { $push: { createdEvents: result } }
        );

        // between the following curly braces is recommended from mongoDB to convert the id to string
        return {
          ...result._doc,
          //   date: new Date(result._doc.date).toISOString(),
        };
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  },
  createUser: async (args) => {
    try {
      let hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      try {
        let result = await db.Users.create({
          email: args.userInput.email,
          password: hashedPassword,
        });

        //   add password: null to prevent the user from getting the password after creating new user
        return {
          ...result._doc,
          password: null,
        };
      } catch (err) {
        if (err.message.includes("E11000 duplicate key error collection")) {
          throw "User Already Exists";
        }
      }
    } catch (err) {
      throw err;
    }
  },
};
