const StatusCodes = require('http-status-codes')
const { CustomAPIError } = require('../errors/all-errors')


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware