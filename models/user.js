import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
    trim: true,
    minlength: [3, "User name must be at least 3 characters long"],
    maxlength: [20, "User name must be at most 20 characters long"],
    validate: {
      validator: validator.isAlphanumeric,
      message: "{VALUE} is not a valid username, username must be alphanumeric",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// Hash the plain text password before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare the plain text password with the hashed password in the database
userSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password)
}

export default mongoose.models.User || mongoose.model("User", userSchema)
