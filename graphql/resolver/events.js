const db = require("../../models");
module.exports = {
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
  createEvent: async (args) => {
    try {
      var result = await db.Events.create({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5f51cb12884779589862f265",
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
};
