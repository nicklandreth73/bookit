import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

console.log("got to pages api")

import { checkBookedDatesOfRoom } from "../../../controllers/bookingControllers"

import onError from "../../../middleware/errors"

const handler = nc({ onError })

dbConnect()

console.log("connected to db")

handler.get(checkBookedDatesOfRoom)

export default handler
