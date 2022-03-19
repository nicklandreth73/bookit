import axios from "axios"

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

// Check Booking
export const checkBooking =
  (roomID, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST })

      let link = `/api/bookings/check?roomId=${roomID}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

      const { data } = await axios.get(link)
      dispatch({
        type: CHECK_BOOKING_SUCCESSFULL,
        payload: data.isAvailable,
      })
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAILURE,
        payload: error,
      })
    }
  }

// Get booked dates
export const getBookedDates = (roomID) => async (dispatch) => {
  try {
    let link = `/api/bookings/check_booked_dates?roomId=${roomID}`

    const { data } = await axios.get(link)
    dispatch({
      type: BOOKED_DATES_SUCCESSFULL,
      payload: data.bookedDates,
    })
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAILURE,
      payload: error,
    })
  }
}

// Get my bookings
export const myBookings = () => async (dispatch) => {
  try {
    let link = `/api/bookings/me`

    const { data } = await axios.get(link)
    dispatch({
      type: MY_BOOKINGS_SUCCESSFULL,
      payload: data.bookings,
    })
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAILURE,
      payload: error,
    })
  }
}

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
