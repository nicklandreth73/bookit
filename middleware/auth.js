import catchAsyncErrors from "./catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import { getSession } from "next-auth/react"

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req })

  console.log(session.user.name)

  if (!session) {
    return next(
      new ErrorHandler(401, "You must be logged in to access this resource")
    )
  }

  req.user = session.user
  next()
})

export { isAuthenticated }
