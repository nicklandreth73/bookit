import { combineReducers } from "redux"
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers"
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  loadedUserReducer,
} from "./userReducers"
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetialsReducer,
} from "./bookingReducers"

const reducer = combineReducers({
  bookingDetails: bookingDetialsReducer,
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  loadedUser: loadedUserReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
})

export default reducer
