import Room from "../models/room"
import ErrorHandler from "../utils/errorHandler"
import APIfeatures from "../utils/apiFeatures"



// get all rooms

const allRooms = (req, res, next) => {

  let roomsCount = 0
  

  const apiFeatures = new APIfeatures(Room.find(), req.query)
  .search()
  .filter()
  .pagination()

  Room.countDocuments()
  .then( (count) => {
    roomsCount = count
  return apiFeatures.query
}
  )
    .then((rooms) => 
    {
      res.status(200)
      .json({
        success: true,
        roomsCount,
        filteredRoomCount: rooms.length,
        rooms,

      })

    })
    .catch(next)
}

// Create new room => /api/rooms
const newRoom = (req, res, next) => {
  const room = Room.create(JSON.parse(req.body))
    .then((room) => {
      res.status(201).json({
        success: true,
        room,
      })
    })
    .catch(next)
}

// get room by id

const getSingleRoom = (req, res, next) => {
  const id = req.query.id
  Room.findById(id)
    .then((room) => {
      if (!room)
        return next(new ErrorHandler(404, "No room with this ID was found"))
      res.status(200).json({
        success: true,
        room,
      })
    })
    .catch(next)
}

// update room by id

const updateRoom = (req, res, next) => {
  const id = req.query.id

  Room.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((room) => {
      if (!room) {
        return res.status(404).json({
          success: false,
          message: "No room with this ID was found",
        })
      }
      res.status(200).json({
        success: true,
        room,
      })
    })
    .catch(next)
}

// delete room by id

const deleteRoom = (req, res, next) => {
  const id = req.query.id

  Room.findByIdAndDelete(id)
    .then((room) => {
      if (!room) {
        return res.status(404).json({
          success: false,
          message: "No room with this ID was found",
        })
      }
      res.status(200).json({
        success: true,
        message: room.name + " was deleted successfully",
      })
    })
    .catch(next)
}

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom }
