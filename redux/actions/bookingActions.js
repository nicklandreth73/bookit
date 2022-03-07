import axios from "axios"

import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESSFULL,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAILURE,
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

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
