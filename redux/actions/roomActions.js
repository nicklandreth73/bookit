import axios from "axios"
import absoluteUrl from "next-absolute-url"
import {
  ALL_ROOMS_SUCCESSFULL,
  ALL_ROOMS_FAILURE,
  ROOM_DETAILS_SUCCESSFULL,
  ROOM_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../constants/roomConstants"

// get all rooms
export const getRooms =
  (req, currentPage = 1, resPerPage = 4, location = "", guests, category) =>
  async (dispatch) => {
    try {
      // get the absolute url of the request
      const { origin } = absoluteUrl(req)
      let link = `${origin}/api/rooms?page=${currentPage}&resPerPage=${resPerPage}&location=${location}`
      if (guests) {
        link += `&guestCapacity=${guests}`
      }
      if (category) {
        link += `&category=${category}`
      }
      let { data } = await axios.get(link)

      dispatch({
        type: ALL_ROOMS_SUCCESSFULL,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAILURE,
        payload: error.response.data.message,
      })
    }
  }

// get room details
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    // get the absolute url of the request
    const { origin } = absoluteUrl(req)

    let { data } = await axios.get(`${origin}/api/rooms/${id}`)

    dispatch({
      type: ROOM_DETAILS_SUCCESSFULL,
      payload: data.room,
    })
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAILURE,
      payload: error,
    })
  }
}
//Clear errors
export const clearErrors = () => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
