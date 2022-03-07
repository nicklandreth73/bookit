import {
  REGISTER_USER_SUCCESSFULL,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESSFULL,
  LOAD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESSFULL,
  UPDATE_USER_RESET,
  UPDATE_USER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESSFULL,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESSFULL,
  RESET_PASSWORD_FAILURE,
  CLEAR_ERRORS,
} from "../constants/userConstants"

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      }

    case REGISTER_USER_SUCCESSFULL:
      return {
        loading: false,
        success: true,
      }

    case REGISTER_USER_FAILURE:
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

// Load reducer
export const loadedUserReducer = (
  state = { loading: true, user: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case LOAD_USER_SUCCESSFULL:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
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

// User reducer
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      }

    case UPDATE_USER_SUCCESSFULL:
      return {
        loading: false,
        isUpdated: action.payload,
      }

    case UPDATE_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case UPDATE_USER_RESET:
      return {
        loading: false,
        isUpdated: false,
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

// forgot password reducer
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      }

    case FORGOT_PASSWORD_SUCCESSFULL:
      return {
        loading: false,
        message: action.payload,
      }

    case RESET_PASSWORD_SUCCESSFULL:
      return {
        loading: false,
        success: action.payload,
      }

    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
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
