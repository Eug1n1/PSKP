const MongoClient = require('mongodb').MongoClient

class DB {
    constructor() {
        this.url = 'mongodb://127.0.0.1:27017/BSTU'
        this.client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .connect()
            .then((connection) => {
                console.log('Connected to MongoDB')
                return connection.db('BSTU')
            })
            .catch((e) => console.log(e))
    }

    async GetRecordsFromCollection(collectionName) {
        return this.client.then(async (db) => {
            return await db.collection(collectionName).find({}).toArray()
        })
    }

    async GetRecords(collection, filter) {
        return this.client.then(async (db) => {
            return await db.collection(collection).find(filter)
        })
    }

    async GetFaculty(faculty) {
        return this.client
            .then((db) => {
                return db.collection('faculty').findOne(faculty)
            })
            .then((record) => {
                return record
            })
    }

    async GetFaculties(filter) {
        return this.client.then(async (db) => {
            const t = await db.collection('faculty').find(filter).toArray()
            return t
        })
    }

    async GetPulpit(pulpit) {
        return this.client
            .then((db) => {
                return db.collection('pulpit').findOne(pulpit)
            })
            .then((record) => {
                return record
            })
    }

    async GetPulpits(filter) {
        return this.client.then(async db => {
            return await db.collection('pulpit').find(filter).toArray()
        })
    }

    async GetPulpitsByFaculties(faculties) {
        return this.client.then(async (db) => {
            faculties = faculties.split(',')
            let pulpits = []

            for (let faculty of faculties) {
                pulpits.push(...await this.GetPulpits({ faculty: faculty }))
            }

            return pulpits
        })
    }

    async InsertFaculty(data) {
        return this.client.then(async (db) => {
            let faculty = await this.GetFaculty(data)
            if (faculty) {
                throw {
                    error: `faculty ${JSON.stringify(data)} already exists`,
                }
            }

            db.collection('faculty')
                .insertOne(data)
                .catch((e) => {
                    throw {
                        error: e.message,
                    }
                })

            return await this.GetFaculty(data)
        })
    }

    async UpdateFaculty(data) {
        return this.client.then(async (db) => {
            console.log(data)
            let oldRecord = await this.GetFaculty({ faculty: data.faculty })

            if (!oldRecord) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }
            delete oldRecord._id
            console.log(oldRecord)

            await db.collection('faculty').updateOne(oldRecord, { $set: data })

            return await this.GetFaculty(data)
        })
    }
}

module.exports = DB
