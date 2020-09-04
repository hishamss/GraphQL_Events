const db = require("../../models");
module.exports = {
  bookings: async () => {
    try {
      var results = await db.Booking.find().populate("event").populate("user");
      return results.map((booking) => {
        return {
          ...booking._doc,
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args) => {
    try {
      let Event = await db.Events.findOne({ _id: args.eventId });
      try {
        let result = await db.Booking.create({
          event: Event,
          user: "5f3c851b0caaca90b81fb296",
        });
        return {
          ...result._doc,
          createdAt: new Date(result._doc.createdAt).toISOString(),
          updatedAt: new Date(result._doc.updatedAt).toISOString(),
        };
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args) => {
    try {
      let result = await db.Booking.deleteOne({
        _id: args.bookingId,
      });
      return "Deleted";
    } catch (err) {
      throw err;
    }
  },
};
