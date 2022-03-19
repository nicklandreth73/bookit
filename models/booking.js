import mongoose from "mongoose"
import timeZone from "mongoose-timezone"

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  checkInDate: {
    type: Date,
    required: true,
  },

  checkOutDate: {
    type: Date,
    required: true,
  },

  amountPaid: {
    type: Number,
    required: true,
  },

  daysBooked: {
    type: Number,
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  datePaid: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

bookingSchema.plugin(timeZone)

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema)
