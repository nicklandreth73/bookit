import React from "react"
import User from "../models/user"
import cloudinary from "cloudinary"
import catchAsyncErrors from "../middleware/catchAsyncErrors"

// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Register user => POST /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "bookit/avatars",
    width: 150,
    crop: "scale",
  })

  // Get user data from request
  const { userName, email, password } = req.body

  // Create new user
  const user = User.create({
    userName,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })
    .then((user) =>
      res.status(200).json({
        success: true,
        message: "User successfully created",
        user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: err,
      })
    )
})

// Current User profile => POST /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  console.log(req)
  const user = await User.findById(req.user.sub)

  res.status(200).json({
    success: true,
    user,
  })
})
export { registerUser, currentUserProfile }
