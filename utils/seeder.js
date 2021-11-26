const Room = require("../models/room.js");
const mongoose = require("mongoose");
const rooms = require("../data/rooms.json");

mongoose.connect("mongodb://localhost:27017/bookit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedRooms = () => {
  Room.deleteMany({})
    .then(() => {
      console.log("Rooms collection deleted");
      return Room.create(rooms);
    })
    .then(() => {
      console.log("Rooms collection seeded");
      mongoose.connection.close();
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
      process.exit();
    });
};

seedRooms();
