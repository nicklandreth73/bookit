import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { newBooking } from "../../../controllers/bookingControllers"

import { isAuthenticated } from "../../../middleware/auth"

import onError from "../../../middleware/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticated).post(newBooking)

export default handler
