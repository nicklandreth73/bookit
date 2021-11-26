const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room name cannot exceed 100 characters"],
  },

  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price"],
    maxLength: [10, "Room price cannot exceed 10 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter room name description"],
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room capacity"],
    maxLength: [2, "Room guest capacity cannot exceed 2 characters"],
  },
  numberOfBeds: {
    type: Number,
    required: [true, "Please enter the number of available beds"],
    maxLength: [2, "Room beds cannot exceed 2 characters"],
  },
  internet: {
    type: Boolean,
    required: [true, "Please indicate if internet connection is available"],
  },
  breakfast: {
    type: Boolean,
    required: [true, "Please indicate if breakfast is available"],
  },
  airConditioned: {
    type: Boolean,
    required: [true, "Please indicate if air conditioner is available"],
  },
  smoking: {
    type: Boolean,
    required: [true, "Please indicate if smoking is available"],
  },
  petsAllowed: {
    type: Boolean,
    required: [true, "Please indicate if pets are allowed"],
  },
  parking: {
    type: Boolean,
    required: [true, "Please indicate if parking is available"],
  },
  pool: {
    type: Boolean,
    required: [true, "Please indicate if pool is available"],
  },
  gym: {
    type: Boolean,
    required: [true, "Please indicate if gym is available"],
  },
  roomCleaning: {
    type: Boolean,
    required: [true, "Please indicate if room cleaning is available"],
  },
  roomService: {
    type: Boolean,
    required: [true, "Please indicate if room service is available"],
  },

  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Please enter room image"],
      },
      url: {
        type: String,
        required: [true, "Please enter room image url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: [
        "Single",
        "Double",
        "Triple",
        "Quad",
        "Twin",
        "King",
        "Queen",
        "Suite",
      ],
      message:
        "Room category must be Single, Double, Twin, Triple, Suite, Quad, King or Queen",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [false, "Please enter user id"],
      },
      usserName: {
        type: String,
        required: [true, "Please enter user name"],
      },
      rating: {
        type: Number,
        required: [true, "Please enter user rating"],
      },
      comment: {
        type: String,
        required: [true, "Please enter user comment"],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [false, "Please enter user id"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
