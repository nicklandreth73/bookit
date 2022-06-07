import Booking from "../models/booking"

import catchAsyncErrors from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"

import Moment from "moment"
import { extendMoment } from "moment-range"

const moment = extendMoment(Moment)

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
  let { roomId, checkInDate, checkOutDate } = req.query

  checkInDate = new Date(checkInDate)
  checkOutDate = new Date(checkOutDate)

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
// Check which dates are booked for a room => POST /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  let { roomId } = req.query

  const bookings = await Booking.find({ room: roomId })

  let bookedDates = []

  const timeDifference = moment().utcOffset() / 60

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(timeDifference, "hours")
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      "hours"
    )

    const range = moment.range(moment(checkInDate), moment(checkOutDate))
    const dates = Array.from(range.by("day"))
    bookedDates = bookedDates.concat(dates)
  })

  res.status(200).json({
    success: true,
    bookedDates,
  })
})

// Get all bookings of current user => POST /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
  res.status(200).json({
    success: true,
    bookings,
  })
})

// Get booking details => POST /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "userName email",
    })

  res.status(200).json({
    success: true,
    booking,
  })
})

export {
  newBooking,
  checkRoomAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
}
