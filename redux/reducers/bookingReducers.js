import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESSFULL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAILURE,
  CLEAR_ERRORS,
} from "../constants/bookingConstants"

// Check Bookings
export const checkBookingReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      }

    case CHECK_BOOKING_SUCCESSFULL:
      return {
        loading: false,
        available: action.payload,
      }

    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      }

    case CHECK_BOOKING_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
