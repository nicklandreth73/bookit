import User from "../models/user"
import cloudinary from "cloudinary"
import catchAsyncErrors from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import sendEmail from "../utils/sendEmail"
import crypto from "crypto"

import absoluteUrl from "next-absolute-url"

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

  console.log(userName, email, password)

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
    .then((user) => {
      console.log(user)
      return user
    })
    .then((user) => {
      console.log(user)
      return res.status(200).json({
        success: true,
        message: "User successfully created",
        user,
      })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: "Error registering user",
        error: err,
      })
    })
})

// Current User profile => POST /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({
    success: true,
    user,
  })
})

// Update User profile => POST /me/update
const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.userName = req.body.userName
    user.email = req.body.email
    if (req.body.password) {
      user.password = req.body.password
    }
    if (req.body.avatar !== "") {
      const image_id = user.avatar.public_id
      await cloudinary.v2.uploader.destroy(image_id)
      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "bookit/avatars",
        width: 150,
        crop: "scale",
      })
      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    }
  }

  await user.save()

  res.status(200).json({
    success: true,
  })
})

// Forgot password => POST /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body })

  if (!user) {
    return next(
      new ErrorHandler(404, "No user was found with this email address")
    )
  }

  // generate  reset token

  const resetToken = user.getPasswordResetToken()

  await user.save({ validateBeforeSave: false })

  // get origin url
  const { origin } = absoluteUrl(req)

  // create password reset url

  const resetUrl = `${origin}/password/reset/${resetToken}`

  const message = `Visit this link to reset your password: \n\n ${resetUrl} /n If you did not request this, please ignore this email and your password will remain unchanged.`

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Bookit password reset token (valid for 10 minutes)",
      message,
    })

    res.status(200).json({
      success: true,
      message: `A password reset link has been sent to the following address: ${user.email}`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetTokenExpire = undefined
    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(500, error.message))
  }
})

// Reset password => POST /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL toekn

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    // make sure reset password expire is greater than ( $gt) the current time
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHandler(400, "Password reset token is invalid or has expired")
    )
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Passwords do not match"))
  }

  // Setup new password

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  })
})

export {
  registerUser,
  currentUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
}
