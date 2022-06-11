import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { stripeCheckoutSession } from "../../../controllers/paymentControllers"

import { isAuthenticated } from "../../../middleware/auth"

import onError from "../../../middleware/errors"

const handler = nc({ onError })

dbConnect()

console.log("connected to db")

handler.use(isAuthenticated).get(stripeCheckoutSession)

export default handler
