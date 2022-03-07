import Booking from "../models/booking"

import catchAsyncErrors from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"

// Create new Booking => POST /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysBooked,
    amountPaid,
    datePaid,
    paymentInfo,
  } = req.body

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysBooked,
    datePaid,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  })

  res.status(200).json({
    success: true,
    booking,
  })
})

// Check rooom booking availability => POST /api/bookings/check
const checkRoomAvailability = catchAsyncErrors(async (req, res) => {
  console.log("got to controller")
  let { roomId, checkInDate, checkOutDate } = req.query

  checkInDate = new Date(checkInDate)
  checkOutDate = new Date(checkOutDate)

  console.log("got to control and pulled from req.query")

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  })

  //Check if there is any booking available for this
  let isAvailable
  console.log(bookings)
  if (bookings && bookings.length === 0) {
    isAvailable = true
  } else {
    isAvailable = false
  }

  res.status(200).json({
    success: true,
    isAvailable,
  })
})

export { newBooking, checkRoomAvailability }