const axios = require('axios')
class CustomAxiosError extends axios.AxiosError {
    constructor(message, file, _function) {
        super(message)
        this.name = 'AxiosError'
        this.stack = message.config
        this.code = message.code
        this.message = message.message
        this.file = file
        this._function = _function
    }
}

module.exports = {CustomAxiosError}
