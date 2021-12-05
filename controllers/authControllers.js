import React from "react"
import User from "../models/user"

// Register user => POST /api/auth/register
const registerUser = (req, res) => {
  // Get user data from request
  const { userName, email, password } = req.body

  // Create new user
  const user = User.create({
    userName,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "https://i.imgur.com/7yUvePI.png",
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
}

export { registerUser }
