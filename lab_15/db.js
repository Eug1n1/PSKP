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

    // async GetRecordsFromCollection(collectionName) {
    //     return this.client.then(async (db) => {
    //         return await db.collection(collectionName).find({}).toArray()
    //     })
    // }

    // async GetRecords(collection, filter) {
    //     return this.client.then(async (db) => {
    //         return await db.collection(collection).find(filter)
    //     })
    // }

    // async GetFaculty(filter) {
    //     return this.client.then(async (db) => {
    //         return await db.collection('faculty').findOne(filter)
    //     })
    // }

    // async GetPulpit(filter) {
    //     return this.client.then(async (db) => {
    //         return await db.collection('pulpit').findOne(filter)
    //     })
    // }

    // async GetFaculties(filter) {
    //     return this.client.then(async (db) => {
    //         const t = await db.collection('faculty').find(filter).toArray()
    //         return t
    //     })
    // }

    // async GetPulpits(filter) {
    //     return this.client.then(async (db) => {
    //         return await db.collection('pulpit').find(filter).toArray()
    //     })
    // }

    // async GetPulpitsByFaculties(faculties) {
    //     return this.client.then(async (db) => {
    //         faculties = faculties.split(',')
    //         let pulpits = []

    //         for (let faculty of faculties) {
    //             pulpits.push(...(await this.GetPulpits({ faculty: faculty })))
    //         }

    //         return pulpits
    //     })
    // }

    async GetAllRecordsFromCollection(collection) {
        try {
            let db = await this.client

            return await db.collection(collection).find({}).toArray()
        } catch (e) {
            return e
        }
    }

    async GetRecords(collection, filter) {
        try {
            let db = await this.client

            return await db.collection(collection).findOne(filter)
        } catch (e) {
            return e
        }
    }

    async GetFaculty(filter) {
        try {
            let db = await this.client
            let faculty = await db.collection('faculty').findOne(filter)

            return faculty === null ? {} : faculty
        } catch (e) {
            return e
        }
    }

    async GetFaculties(filter) {
        try {
            let db = await this.client

            return await db.collection('faculty').find(filter).toArray()
        } catch (e) {
            return e
        }
    }

    async GetPulpit(filter) {
        try {
            let db = await this.client

            return await db.collection('pulpit').findOne(filter)
        } catch (e) {
            return e
        }
    }

    async GetPulpits(filter) {
        try {
            let db = await this.client

            return await db.collection('pulpit').find(filter).toArray()
        } catch (e) {
            return e
        }
    }

    async GetPulpitsByFaculties(faculties) {
        try {
            faculties = faculties.split(',')
            let pulpits = []

            for (let faculty of faculties) {
                pulpits.push(...(await this.GetPulpits({ faculty: faculty })))
            }

            return pulpits
        } catch (e) {
            return e
        }
    }

    // async InsertFaculty(data) {
    //     return this.client
    //         .then(async (db) => {
    //             let faculty = await this.GetFaculty({ faculty: data?.faculty })

    //             if (faculty) {
    //                 throw {
    //                     error: `faculty ${JSON.stringify(
    //                         data.faculty
    //                     )} already exists`,
    //                 }
    //             }

    //             db.collection('faculty')
    //                 .insertOne(data)
    //                 .catch((e) => {
    //                     console.log({
    //                         error: e.message,
    //                     })
    //                 })

    //             return await this.GetFaculty(data)
    //         })
    //         .catch((e) => {
    //             throw {
    //                 error: e.message,
    //             }
    //         })
    // }

    // async InsertPulpit(data) {
    //     return this.client.then(async (db) => {
    //         console.log(data)
    //         let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

    //         if (pulpit) {
    //             throw {
    //                 error: `pulpit ${data.pulpit} already exists`,
    //             }
    //         }

    //         db.collection('pulpit')
    //             .insertOne(data)
    //             .catch((e) => {
    //                 throw {
    //                     error: e.message,
    //                 }
    //             })

    //         console.log(data)
    //         return await this.GetPulpit(data)
    //     })
    // }

    async InsertFaculty(data) {
        try {
            let db = await this.client

            let faculty = await this.GetFaculty({ faculty: data?.faculty })

            if (faculty) {
                throw {
                    error: `faculty ${JSON.stringify(
                        data.faculty
                    )} already exists`,
                }
            }

            await db.collection('faculty').insertOne(data)

            return await this.GetFaculty(data)
        } catch (e) {
            return e
        }
    }

    async InsertPulpit(data) {
        try {
            let db = await this.client

            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

            if (pulpit) {
                throw {
                    error: `pulpit ${data.pulpit} already exists`,
                }
            }

            await db.collection('pulpit').insertOne(data)

            return await this.GetPulpit(data)
        } catch (e) {
            return e
        }
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

            return data
        } catch (e) {
            await session.abortTransaction()

            return e
        } finally {
            await session.endSession()
        }
    }

    // async UpdateFaculty(data) {
    //     return this.client.then(async (db) => {
    //         let faculty = await this.GetFaculty({ faculty: data.faculty })

    //         if (!faculty) {
    //             throw {
    //                 error: `faculty ${data.faculty} does not exists`,
    //             }
    //         }

    //         await db
    //             .collection('faculty')
    //             .updateOne(faculty, { $set: data })
    //             .catch((e) => {
    //                 throw {
    //                     error: e.message,
    //                 }
    //             })

    //         return await this.GetFaculty(data)
    //     })
    // }

    // async UpdatePulpit(data) {
    //     return this.client.then(async (db) => {
    //         let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

    //         if (!pulpit) {
    //             throw {
    //                 error: `faculty ${data.faculty} does not exists`,
    //             }
    //         }

    //         await db
    //             .collection('pulpit')
    //             .updateOne(pulpit, { $set: data })
    //             .catch((e) => {
    //                 throw {
    //                     error: e.message,
    //                 }
    //             })

    //         return await this.GetPulpit(data)
    //     })
    // }

    async UpdateFaculty(data) {
        try {
            let db = await this.client

            let faculty = await this.GetFaculty({ faculty: data.faculty })

            if (!faculty) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db.collection('faculty').updateOne(faculty, { $set: data })

            return await this.GetFaculty(data)
        } catch (e) {
            return e
        }
    }

    async UpdatePulpit(data) {
        try {
            let db = await this.client
            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

            if (!pulpit) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db.collection('pulpit').updateOne(pulpit, { $set: data })

            return await this.GetPulpit(data)
        } catch (e) {
            return e
        }
    }

    // async DeleteFaculty(data) {
    //     return this.client.then(async (db) => {
    //         let faculty = await this.GetFaculty({ faculty: data.faculty })

    //         if (!faculty) {
    //             throw {
    //                 error: `faculty ${data.faculty} does not exists`,
    //             }
    //         }

    //         await db.collection('faculty').deleteOne(faculty)

    //         return faculty
    //     })
    // }

    // async DeletePulpit(data) {
    //     return this.client.then(async (db) => {
    //         let pulpit = await this.GetPulpit({ pulpit: data.pulpit })

    //         if (!pulpit) {
    //             throw {
    //                 error: `pulpit ${data.pulpit} does not exists`,
    //             }
    //         }

    //         await db.collection('pulpit').deleteOne(pulpit)

    //         return pulpit
    //     })
    // }

    async DeleteFaculty(data) {
        try {
            let db = await this.client

            let faculty = await this.GetFaculty({ faculty: data.faculty })
            if (!faculty) {
                throw {
                    error: `faculty ${data.faculty} does not exists`,
                }
            }

            await db.collection('faculty').deleteOne(faculty)

            return faculty
        } catch (e) {
            return e
        }
    }

    async DeletePulpit(data) {
        try {
            let db = await this.client

            let pulpit = await this.GetPulpit({ pulpit: data.pulpit })
            if (!pulpit) {
                throw {
                    error: `pulpit ${data.pulpit} does not exists`,
                }
            }

            await db.collection('pulpit').deleteOne(pulpit)

            return pulpit
        } catch (e) {
            return e
        }
    }
}

module.exports = DB
