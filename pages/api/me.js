import nc from "next-connect"
import dbConnect from "../../config/dbConnect"

import { currentUserProfile } from "../../controllers/authControllers"

import { isAuthenticated } from "../../middleware/auth"
import onError from "../../middleware/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticated).get(currentUserProfile)

export default handler
