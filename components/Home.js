import React, { useEffect } from "react"
import RoomItem from "./rooms/RoomItem"
import Pagination from "react-js-pagination"
import { useRouter } from "next/router"
import Form from "react-bootstrap/Form"
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearErrors } from "../redux/actions/roomActions"

export const Home = () => {
  // variable declarations and definitions
  const router = useRouter()
  const {
    location = null,
    page = 1,
    guests,
    category,
    resPerPage = 4,
  } = router.query

  const { rooms, roomsCount, filteredRoomsCount, error } = useSelector(
    (state) => state.allRooms
  )
  const dispatch = useDispatch()
  // if location is defined then count is filteredRoomsCount else count is roomsCount
  let count = filteredRoomsCount || roomsCount

  // functions to handle limiting and filtering rooms per page
  const handlePagination = (pageNumber) => {
    let link = `/?page=${pageNumber}&resPerPage=${resPerPage}` // default link
    if (location) {
      link += `&location=${location}`
    }
    if (guests) {
      link += `&guests=${guests}`
    }
    if (category) {
      link += `&category=${category}`
    }
    router.push(link)
  }
  const setResPerPage = (e) => {
    let link = `/?page=1&resPerPage=${e.target.value}`
    if (location) {
      link += `&location=${location}`
    }
    if (guests) {
      link += `&guests=${guests}`
    }
    if (category) {
      link += `&category=${category}`
    }
    router.push(link)
  }

  // a helper function to capitalize words in a string
  function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase()
    })
  }

  // error handling
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [])

  return (
    <>
      {console.log(
        "count: " + rooms.length + " filteredRoomsCount: " + filteredRoomsCount
      )}
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${capitalizeWords(location)}` : "All rooms"}
        </h2>
        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left" /> New Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger">
              {" "}
              <b>No Rooms Found</b>{" "}
            </div>
          ) : (
            rooms.map((room) => <RoomItem key={room.id} room={room} />)
          )}
        </div>
      </section>
      {console.log(filteredRoomsCount / resPerPage)}
      {filteredRoomsCount > resPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            pageRangeDisplayed={Math.ceil(filteredRoomsCount / resPerPage)}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
      <div className="d-flex justify-content-center mt-1">
        <Form.Select
          onChange={setResPerPage}
          aria-label="Default select example"
        >
          <option>Set Results per page</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
          <option value="6">Six</option>
          <option value="7">Seven</option>
          <option value="8">Eight</option>
        </Form.Select>
      </div>
    </>
  )
}

export default Home
