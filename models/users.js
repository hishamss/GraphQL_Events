const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  ],
});
// Export the model to app.js
module.exports = mongoose.model("user", userSchema);
