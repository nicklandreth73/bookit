import React from "react"
import Image from "next/image"
import Link from "next/link"

import UserName from "./UserName"

const Header = () => {
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <a>
                <Image
                  src="/images/bookit_logo.png"
                  alt="BookIT"
                  height={80}
                  width={200}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          <UserName />
        </div>
      </div>
    </nav>
  )
}

export default Header
