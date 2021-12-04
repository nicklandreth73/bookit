import React, { useState } from "react"
import Collapse from "react-bootstrap/Collapse"
import Button from "react-bootstrap/Button"

const RoomFeatures = ({ room }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true" />
        <p>{room.guestCapacity} Guests</p>
      </div>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true" />
        <p>{room.numberOfBeds} Beds</p>
      </div>
      <Button
        variant="danger"
        onClick={() => {
          setOpen(!open)
        }}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Show Features
      </Button>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="room-feature">
            <i
              className={
                room.breakfast
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Breafast</p>
          </div>
          <div className="room-feature">
            <i
              className={
                room.petsAllowed
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Pets Allowed</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.smoking
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Smoking Allowed</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.parking
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Parking</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.internet
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Internet</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.airConditioned
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Air Conditioned</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.gym
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Gym</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.pool
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Pool</p>
          </div>

          <div className="room-feature">
            <i
              className={
                room.roomCleaning
                  ? "fa fa-check text-success"
                  : "fa fa-times text-danger"
              }
              aria-hidden="true"
            />
            <p>Room Cleaning</p>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default RoomFeatures
