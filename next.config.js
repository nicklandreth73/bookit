module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",

    STRIPE_API_KEY:
      "pk_test_51L9Q2xEwD6dvDILLM8tgYPwQGv31DXFTu17cYGL7omTZGFI95ou6awrwGiln05ZjVosxKbXJN8XmRbCdpugfNMSf00QKfPlnot",
    STRIPE_SECRET_KEY:
      "sk_test_51L9Q2xEwD6dvDILLPMsTmHACCfTlxbvGawknkpL7H6tQFKBfo8mQIVYVpSsEltCaE58bpp16YoD6aeGLliYZUyCK0085sByz4w",

    CLOUDINARY_CLOUD_NAME: "dmjzyj80v",
    CLOUDINARY_API_KEY: "951137411934139",
    CLOUDINARY_API_SECRET: "Xd1uI4zxvGPcJoC7X8HpU2EJltQ",

    SMPT_SERVICE: "gmail",
    SMPT_USER: "nicklandreth75@gmail.com",
    SMPT_PASSWORD: "bwdpchdodomkgmje",
    SMPT_FROM_EMAIL: "nicklandreth75@gmail.com",
    SMPT_FROM_NAME: "Bookit",
  },
  images: {
    domains: ["a0.muscache.com", "res.cloudinary.com"],
  },
}
