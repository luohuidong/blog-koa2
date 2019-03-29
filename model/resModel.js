const successModel = (data) => ({
  data,
  errno: 0
})

const errorModel = (message) => ({
  message,
  errno: 1
})

module.exports = {
  successModel,
  errorModel
}
