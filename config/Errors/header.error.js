class CustomHeaderError extends Error {
    constructor(error, file, _function) {
        super(error)
        this.statusCode = 400
        this.name = 'HeaderError'
        this.stack = error.stack
        this.code = 'ERR_HEADER'
        this.message = error.message
        this.file = file
        this._function = _function
    }
}

module.exports = {CustomHeaderError}
