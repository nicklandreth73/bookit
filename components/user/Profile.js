import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import { toast } from "react-toastify"
import ButtonLoader from "../layout/ButtonLoader"
import Loader from "../layout/Loader"

import { useDispatch, useSelector } from "react-redux"
import { updateProfile, clearErrors } from "../../redux/actions/userActions"
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants"

import imageHandler from "../../utils/imageHandler"

const Profile = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  // This sets the required property of the password confirm field to true if there is a password and vice versa
  const [passwordConfirm, setPasswordConfirm] = useState(false)

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

  const { user: loadedUser, loading } = useSelector((state) => state.auth)
  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.user)
  const [imageCompressing, setImageCompressing] = useState(false)

  useEffect(() => {
    if (loadedUser) {
      setUser({
        userName: loadedUser.userName,
        email: loadedUser.email,
      })
      setAvatarPreview(loadedUser.avatar.url)
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      toast.success("Profile updated successfully")
      dispatch({ type: UPDATE_USER_RESET })
      router.push("/")
    }
  }, [dispatch, isUpdated, error, loadedUser])

  const submitHandler = (e) => {
    e.preventDefault()
    if (imageCompressing)
      toast.warning("Please wait while we optimize your image")
    if (password !== confirmPassword)
      return toast.error("Passwords do not match")

    const userData = {
      userName,
      email,
      password,
      avatar,
    }
    dispatch(updateProfile(userData))
  }

  const onChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      setImageCompressing(true)
      const reader = new FileReader()
      imageHandler(e.target.files[0]).then((file) => {
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }

        reader.readAsDataURL(file)
      })
    } else {
      if (
        (e.target.name === "password" && e.target.value !== "") ||
        (e.target.name === "confirmPassword" && e.target.value !== "")
      ) {
        setPasswordConfirm(true)
      }
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="container container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-3">Update Profile</h1>
                  <div className="form-group">
                    <label htmlFor="name_field">User Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      name="userName"
                      required="false"
                      defaultValue={userName}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      required="false"
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
                      required={passwordConfirm}
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
                    required={passwordConfirm}
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
                          className="custom-file-input"
                          id="customFile"
                          accept="image/*"
                          onChange={onChangeHandler}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose Avatar
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={updateLoading}
                  >
                    {updateLoading ? <ButtonLoader /> : "UPDATE PROFILE"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
