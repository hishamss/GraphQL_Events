const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async ({ email, password }) => {
    try {
      const user = await db.Users.findOne({ email });
      if (!user) throw new Error("User doesn't exists!!");
      try {
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("Password is incorrect!!");
        // Genera JWT token
        const token = jwt.sign(
          { userId: user.id, email: user.email }, // user.id is the same as user._id but converted to string
          "myprivatesecretkey",
          {
            expiresIn: "1h",
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
};
