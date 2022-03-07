import axios from "axios"

import {
  REGISTER_USER_SUCCESSFULL,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESSFULL,
  LOAD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESSFULL,
  UPDATE_USER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESSFULL,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESSFULL,
  RESET_PASSWORD_FAILURE,
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
      payload: error,
    })
  }
}
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get("/api/me")

    dispatch({
      type: LOAD_USER_SUCCESSFULL,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error,
    })
  }
}

// update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put("/api/me/update", userData, config)

    dispatch({
      type: UPDATE_USER_SUCCESSFULL,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error,
    })
  }
}

// forgot password profile
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post("/api/password/forgot", email, config)

    dispatch({
      type: FORGOT_PASSWORD_SUCCESSFULL,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error,
    })
  }
}

// reset password action
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      password,
      config
    )

    dispatch({
      type: RESET_PASSWORD_SUCCESSFULL,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
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
