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
