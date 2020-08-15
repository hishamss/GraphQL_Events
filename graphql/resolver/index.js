const db = require("../../models");
const bcrypt = require("bcrypt");
module.exports = {
  users: () => {
    return db.Users.find()
      .populate("createdEvents")
      .then((result) => {
        return result.map((row) => {
          return {
            ...row._doc,
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  events: () => {
    return db.Events.find()
      .populate("creator")
      .then((result) => {
        return result.map((row) => {
          return {
            ...row._doc,
            creator: {
              ...row._doc.creator._doc,
              password: null,
            },
          };
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
      creator: "5f371e5b4d07a27630b64c64",
    })
      .then((result) => {
        return db.Users.findOneAndUpdate(
          { _id: "5f371e5b4d07a27630b64c64" },
          //   Note: mongoose will only get the id of the new added event object and push it to createdEvents array
          { $push: { createdEvents: result } }
        )
          .then(() => {
            // between the following curly braces is recommended from mongoDB to convert the id to string
            return { ...result._doc };
          })

          .catch((err) => {
            throw err;
          });
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
            };
          })
          .catch((err) => {
            if (err.message.includes("E11000 duplicate key error collection")) {
              throw "User Already Exists";
            }
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
