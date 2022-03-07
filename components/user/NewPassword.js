import React, { useState, useEffect } from "react"
import router, { useRouter } from "next/router"

import { toast } from "react-toastify"
import ButtonLoader from "../layout/ButtonLoader"

import { useDispatch, useSelector } from "react-redux"
import { resetPassword, clearErrors } from "../../redux/actions/userActions"

const NewPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      toast.error("No user with this email address was found")
      dispatch(clearErrors())
    }
    if (success) {
      router.push("/login")
    }
  }, [dispatch, success, error])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const passwords = {
      password,
      confirmPassword,
    }

    dispatch(resetPassword(router.query.token, passwords))
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Reset Password`</h1>
          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
