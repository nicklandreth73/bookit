import React, { useEffect } from "react"
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../../redux/actions/userActions"
import { signOut } from "next-auth/react"

const UserName = () => {
  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.loadedUser)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      {user ? (
        <div className="ml-4 dropdown d-line">
          <a
            className="btn dropdown-toggle mr-4"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src={user.avatar && user.avatar.url}
                alt={user && `${user.userName}'s avatar image`}
                className="rounded-circle"
              />
            </figure>
            <span>{user && user.userName}</span>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <Link href="/bookings/me">
              <a className="dropdown-item">My Bookings</a>
            </Link>
            <Link href="/me/update">
              <a className="dropdown-item">Profile</a>
            </Link>
            <Link href="/">
              <a className="dropdown-item text-danger" onClick={handleSignOut}>
                Logout
              </a>
            </Link>
          </div>
        </div>
      ) : (
        !loading && (
          <Link href="/login">
            <a className="btn btn-danger px-4 text-white login-header-btn float-right">
              Login
            </a>
          </Link>
        )
      )}
    </>
  )
}

export default UserName
