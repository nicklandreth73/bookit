import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { getBookingDetails } from "../../../controllers/bookingControllers"

import { isAuthenticated } from "../../../middleware/auth"

import onError from "../../../middleware/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticated).get(getBookingDetails)

export default handler
