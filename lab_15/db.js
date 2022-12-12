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

    async GetFaculty(filter) {
        return this.client.then(async (db) => {
            return await db.collection('faculty').findOne(filter)
        })
    }

    async GetFaculties(filter) {
        return this.client.then(async (db) => {
            const t = await db.collection('faculty').find(filter).toArray()
            return t
        })
    }

    async GetPulpit(filter) {
        return this.client.then(async (db) => {
            return await db.collection('pulpit').findOne(filter)
        })
    }

    async GetPulpits(filter) {
        return this.client.then(async (db) => {
            return await db.collection('pulpit').find(filter).toArray()
        })
    }

    async GetPulpitsByFaculties(faculties) {
        return this.client.then(async (db) => {
            faculties = faculties.split(',')
            let pulpits = []

            for (let faculty of faculties) {
                pulpits.push(...(await this.GetPulpits({ faculty: faculty })))
            }

            return pulpits
        })
    }

    async InsertFaculty(data) {
        return this.client.then(async (db) => {
            let faculty = await this.GetFaculty({ faculty: data.faculty })

            if (faculty) {
                throw {
                    error: `faculty ${JSON.stringify(
                        data.faculty
                    )} already exists`,
                }
            }

            db.collection('faculty')
                .insertOne(data)
                .catch((e) => {
                    throw {
                        error: e.message,
                    }
                })

            console.log(data)
            return await this.GetFaculty(data)
        })
    }

    async InsertPulpit(data) {
        return this.client.then(async (db) => {
            console.log(data)
            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

            if (pulpit) {
                throw {
                    error: `pulpit ${data.pulpit} already exists`,
                }
            }

            db.collection('pulpit')
                .insertOne(data)
                .catch((e) => {
                    throw {
                        error: e.message,
                    }
                })

            console.log(data)
            return await this.GetPulpit(data)
        })
    }

    async InsertPulpits(data, transactionOptions) {
        let client = new MongoClient(this.url)
        await client.connect()
        let collection = client.db('BSTU').collection('pulpit')
        let session = client.startSession()

        try {
            session.startTransaction(transactionOptions)

            console.log(data)
            for (let pulpit of data) {
                if (
                    await collection.findOne(
                        { pulpit: pulpit.pulpit },
                        { session }
                    )
                ) {
                    throw {
                        error: `pulpit ${pulpit.pulpit} already exists`,
                    }
                }

                await collection.insertOne(pulpit, { session })

                console.log(`inserted ${pulpit.pulpit}`)
            }

            await session.commitTransaction()
        } catch (e) {
            await session.abortTransaction()
            console.log(e)
        } finally {
            await session.endSession()
        }

        return data
    }

    async UpdateFaculty(data) {
        return this.client.then(async (db) => {
            let faculty = await this.GetFaculty({ faculty: data.faculty })

            if (!faculty) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db
                .collection('faculty')
                .updateOne(faculty, { $set: data })
                .catch((e) => {
                    throw {
                        error: e.message,
                    }
                })

            return await this.GetFaculty(data)
        })
    }

    async UpdatePulpit(data) {
        return this.client.then(async (db) => {
            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

            if (!pulpit) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db
                .collection('pulpit')
                .updateOne(pulpit, { $set: data })
                .catch((e) => {
                    throw {
                        error: e.message,
                    }
                })

            return await this.GetPulpit(data)
        })
    }

    async DeleteFaculty(data) {
        return this.client.then(async (db) => {
            let faculty = await this.GetFaculty({ faculty: data.faculty })

            if (!faculty) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db.collection('faculty').deleteOne(faculty)

            return faculty
        })
    }

    async DeletePulpit(data) {
        return this.client.then(async (db) => {
            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

            if (!pulpit) {
                throw {
                    error: `pulpit ${data.pulpit} does not exists`,
                }
            }

            await db.collection('pulpit').deleteOne(pulpit)

            return pulpit
        })
    }
}

module.exports = DB
