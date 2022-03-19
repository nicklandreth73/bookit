import React, { useEffect } from "react"
import { MDBDataTable } from "mdbreact"

import Link from "next/link"

import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearErrors } from "../../redux/actions/bookingActions"

const MyBookings = () => {
  const dispatch = useDispatch()
  const { bookings, error } = useSelector((state) => state.bookings)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch])

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Chek In Date",
          field: "checkInDate",
          sort: "asc",
        },
        {
          label: "Chek Out Date",
          field: "checkOutDate",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amouunt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    }
    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkInDate: new Date(booking.checkInDate).toLocaleDateString(
            "en-US"
          ),
          checkOutDate: new Date(booking.checkOutDate).toLocaleDateString(
            "en-US"
          ),
          amouunt: `${booking.amouuntPaid} `,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>
              <button className="btn btn-success mx-2">
                <i className="fa fa-download"></i>
              </button>
            </>
          ),
        })
      })
    return data
  }

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  )
}

export default MyBookings
