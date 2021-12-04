import {
  ALL_ROOMS_SUCCESSFULL,
  ALL_ROOMS_FAILURE,
  ROOM_DETAILS_SUCCESSFULL,
  ROOM_DETAILS_FAILURE,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESSFULL,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAILURE,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESSFULL,
  REVIEW_AVAILABILITY_FAILURE,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESSFULL,
  ADMIN_ROOMS_FAILURE,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESSFULL,
  NEW_ROOM_RESET,
  NEW_ROOM_FAILURE,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESSFULL,
  UPDATE_ROOM_RESET,
  UPDATE_ROOM_FAILURE,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESSFULL,
  DELETE_ROOM_RESET,
  DELETE_ROOM_FAILURE,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESSFULL,
  GET_REVIEWS_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESSFULL,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAILURE,
  CLEAR_ERRORS,
} from "../constants/roomConstants"

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ADMIN_ROOMS_REQUEST:
      return {
        loading: true,
      }

    case ALL_ROOMS_SUCCESSFULL:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      }

    case ADMIN_ROOMS_SUCCESSFULL:
      return {
        loading: false,
        rooms: action.payload,
      }

    case ALL_ROOMS_FAILURE:
    case ADMIN_ROOMS_FAILURE:
      return {
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

// Room details reducer
export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESSFULL:
      return {
        room: action.payload,
      }

    case ROOM_DETAILS_FAILURE:
      return {
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

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        loading: true,
      }

    case NEW_ROOM_SUCCESSFULL:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      }

    case NEW_ROOM_RESET:
      return {
        success: false,
      }

    case NEW_ROOM_FAILURE:
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

export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
      return {
        loading: true,
      }

    case UPDATE_ROOM_SUCCESSFULL:
      return {
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_ROOM_SUCCESSFULL:
      return {
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_ROOM_RESET:
      return {
        isUpdated: false,
      }

    case DELETE_ROOM_RESET:
      return {
        loading: false,
        isDeleted: false,
      }

    case UPDATE_ROOM_FAILURE:
    case DELETE_ROOM_FAILURE:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      }

    case NEW_REVIEW_SUCCESSFULL:
      return {
        loading: false,
        success: action.payload,
      }

    case NEW_REVIEW_RESET:
      return {
        success: false,
      }

    case NEW_REVIEW_FAILURE:
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

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true,
      }

    case REVIEW_AVAILABILITY_SUCCESSFULL:
      return {
        loading: false,
        reviewAvailable: action.payload,
      }

    case REVIEW_AVAILABILITY_FAILURE:
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

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        loading: true,
      }

    case GET_REVIEWS_SUCCESSFULL:
      return {
        loading: false,
        reviews: action.payload,
      }

    case GET_REVIEWS_FAILURE:
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
      }

    case DELETE_REVIEW_SUCCESSFULL:
      return {
        loading: false,
        isDeleted: action.payload,
      }

    case DELETE_REVIEW_RESET:
      return {
        loading: false,
        isDeleted: false,
      }

    case DELETE_REVIEW_FAILURE:
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
