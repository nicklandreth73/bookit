import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import { toast } from "react-toastify"
import ButtonLoader from "../layout/ButtonLoader"

import { useDispatch, useSelector } from "react-redux"
import { registerUser, clearErrors } from "../../redux/actions/userActions"

const Register = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { userName, email, password, confirmPassword } = user

  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  )

  const { success, errors, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (success) {
      toast.success("Registration Successful")
      router.push("/login")
    }

    if (errors) {
      toast.error(errors)
      dispatch(clearErrors())
    }
  }, [dispatch, success, errors])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return toast.error("Passwords do not match")

    const userData = {
      userName,
      email,
      password,
      avatar,
    }
    dispatch(registerUser(userData))
  }

  const onChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()
      const file = e.target.files[0]
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(file)
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <div>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Join Us</h1>
              <div className="form-group">
                <label htmlFor="name_field">User Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="userName"
                  required="true"
                  defaultValue={userName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  required="true"
                  className="form-control"
                  name="email"
                  defaultValue={email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  required="true"
                  className="form-control"
                  name="password"
                  defaultValue={password}
                  onChange={onChangeHandler}
                />
              </div>
              <label htmlFor="password_field">Confirm Password</label>
              <input
                type="password"
                id="password_confirm_field"
                required="true"
                className="form-control"
                name="confirmPassword"
                defaultValue={confirmPassword}
                onChange={onChangeHandler}
              />
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <Image
                        width={100}
                        height={100}
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="image"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      required="true"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChangeHandler}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                {loading ? <ButtonLoader /> : "REGIISTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
