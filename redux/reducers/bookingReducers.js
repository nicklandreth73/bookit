import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESSFULL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAILURE,
  BOOKED_DATES_SUCCESSFULL,
  BOOKED_DATES_FAILURE,
  MY_BOOKINGS_SUCCESSFULL,
  MY_BOOKINGS_FAILURE,
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

// Get all booked dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESSFULL:
      return {
        loading: false,
        dates: action.payload,
      }

    case BOOKED_DATES_FAILURE:
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

// Get my bookings
export const bookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case MY_BOOKINGS_SUCCESSFULL:
      return {
        loading: false,
        bookings: action.payload,
      }

    case MY_BOOKINGS_FAILURE:
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
