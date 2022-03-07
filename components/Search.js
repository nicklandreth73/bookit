import React, { useState } from "react"
import { useRouter } from "next/router"

const Search = () => {
  //variable declarations and definitions
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState("")
  const [category, setCategory] = useState("")

  //function definitions needs refactoring
  const submitHandler = (e) => {
    e.preventDefault()
    if (location === "" && guests === "" && category === "") {
      router.push("/")
    } else if (location !== "" && guests !== "" && category !== "") {
      router.push(
        `/?location=${location}&guests=${guests}&category=${category}`
      )
    } else if (location !== "" && guests !== "" && category === "") {
      router.push(`/?location=${location}&guests=${guests}`)
    } else if (location !== "" && guests === "" && category !== "") {
      router.push(`/?location=${location}&category=${category}`)
    } else if (location === "" && guests !== "" && category !== "") {
      router.push(`/?guests=${guests}&category=${category}`)
    } else if (location === "" && guests === "" && category !== "") {
      router.push(`/?category=${category}`)
    } else if (location !== "" && guests === "" && category === "") {
      router.push(`/?location=${location}`)
    } else if (location === "" && guests !== "" && category === "") {
      router.push(`/?guests=${guests}`)
    }
  }

  return (
    <div>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h2 className="mb-3">Search Rooms</h2>
              <div className="form-group">
                <label htmlFor="location_field">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location_field"
                  placeholder="new york"
                  defaultValue={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="guest_field">No. of Guests</label>
                <select
                  className="form-control"
                  id="guest_field"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {["Any", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="room_type_field">Room Type</label>
                <select
                  className="form-control"
                  id="room_type_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {[
                    "Any",
                    "King",
                    "Single",
                    "Queen",
                    "Twin",
                    "Double",
                    "Triple",
                    "Quad",
                    "Penthouse",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-block py-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
