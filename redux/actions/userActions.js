import axios from "axios"
import absoluteUrl from "next-absolute-url"

import {
  REGISTER_USER_SUCCESSFULL,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  CLEAR_ERRORS,
} from "../constants/userConstants"

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post("/api/auth/register", userData, config)

    dispatch({
      type: REGISTER_USER_SUCCESSFULL,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response.data.error,
    })
  }
}

//Clear errors
export const clearErrors = () => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
