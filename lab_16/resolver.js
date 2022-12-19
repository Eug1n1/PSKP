const DB = require('./DB')
const db = new DB()

let resolver = {
    getFaculties: () => {
        try {
            console.log(1)
            return '123'
        } catch (e) {
            return {
                error: e.message,
            }
        }
    },
}

module.exports = resolver
