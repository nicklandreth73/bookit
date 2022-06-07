import axios from "axios"
import absoluteUrl from "next-absolute-url"

import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESSFULL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAILURE,
  BOOKED_DATES_SUCCESSFULL,
  BOOKED_DATES_FAILURE,
  MY_BOOKINGS_SUCCESSFULL,
  MY_BOOKINGS_FAILURE,
  BOOKING_DETAILS_SUCCESSFULL,
  BOOKING_DETAILS_FAILURE,
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
        payload: error.message,
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
export const myBookings = (authCookie, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)

    const config = {
      headers: {
        cookie: authCookie,
      },
    }
    let link = `${origin}/api/bookings/me`

    const { data } = await axios.get(link, config)
    dispatch({
      type: MY_BOOKINGS_SUCCESSFULL,
      payload: data.bookings,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: MY_BOOKINGS_FAILURE,
      payload: error.message,
    })
  }
}

// Get booking details
export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)

    const config = {
      headers: {
        cookie: authCookie,
      },
    }
    let link = `${origin}/api/bookings/${id}`

    const { data } = await axios.get(link, config)

    console.log(data.booking)
    dispatch({
      type: BOOKING_DETAILS_SUCCESSFULL,
      payload: data.booking,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: BOOKING_DETAILS_FAILURE,
      payload: error.message,
    })
  }
}

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
