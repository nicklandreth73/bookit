import React, { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { clearErrors } from "../../redux/actions/roomActions"
import { Carousel } from "react-bootstrap"
import RoomFeatures from "./RoomFeatures"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { toast } from "react-toastify"
import {
  checkBooking,
  getBookedDates,
} from "../../redux/actions/bookingActions"
import { CHECK_BOOKING_RESET } from "../../redux/constants/bookingConstants"

import axios from "axios"

const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysBooked, setDaysBooked] = useState()

  const { user } = useSelector((state) => state.loadedUser)
  const { dates } = useSelector((state) => state.bookedDates)
  const { room, error } = useSelector((state) => state.roomDetails)
  const { available, loading: bookingLoading } = useSelector(
    (state) => state.checkBooking
  )
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  const excludedDates = dates.map((date) => {
    return new Date(date)
  })
  console.log(excludedDates)

  const onDatePickerChange = (dates) => {
    const [checkInDate, checkOutDate] = dates

    console.log(dates)
    setCheckInDate(checkInDate)
    setCheckOutDate(checkOutDate)

    if (checkInDate && checkOutDate) {
      dispatch({ type: CHECK_BOOKING_RESET })
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      )
      setDaysBooked(days)
      dispatch(
        checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      )
    }
  }

  const onBookRoom = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysBooked,
      datePaid: Date.now(),
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    }
    console.log(bookingData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const data = await axios.post("/api/bookings", bookingData, config)
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    dispatch(getBookedDates(id))
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, id])

  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>

      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>
        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5.5) * 100}%` }}
            />
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>
        <Carousel hover="pause" indicators={false} nextLabel="" prevLabel="">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image._id}>
                <div style={{ width: "100%", height: "440px" }}> </div>
                <Image
                  className="d-block m-auto"
                  src={image.url}
                  alt={room.name}
                  layout="fill"
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>
              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onDatePickerChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />
              {available === true && user && (
                <>
                  <div className="d-none">
                    {toast.success("This room is available book now!")}
                  </div>
                  <button
                    className="btn btn-block py-3 booking-btn"
                    onClick={onBookRoom}
                  >
                    Pay
                  </button>
                </>
              )}
              {available === true && !user && (
                <div className="d-none">
                  {toast.success(
                    "This room is available. Log in and book now!"
                  )}
                </div>
              )}
              {available === false && (
                <div className="d-none">
                  {toast.error(
                    "This room is not available on the dates you chose, check out our other listings."
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner" />
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>
            <hr />
          </div>
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner" />
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomDetails
