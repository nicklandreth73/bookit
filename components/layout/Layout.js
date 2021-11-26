import React from "react"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({
  children,
  title = "Book the Best Hotels for your Holiday",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
