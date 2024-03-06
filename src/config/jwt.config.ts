export default () => ({
  secret: process.env.JWT_TOKEN,
        signOptions: {
          expiresIn:  process.env.JWT_EXPIRES
        }
})
