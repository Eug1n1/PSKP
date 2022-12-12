### Single instance to replica set
1. Shutdown your mongodb instance if running.
2. Start main instance with specified replica set group, there are two ways.
    - with this command:
    ```bash
    mongod --dbpath <path to empty dir> --port 27017 --replSet <any replica set name>
    ```
    - with config file. Add these few lines to your [mongodb config](https://www.mongodb.com/docs/manual/reference/configuration-options/) and the start server
    ```yaml
    replication:
      replSetName: sr0
    ```
3. Start slave mongodb instance with different port e.g. 27018.
```bash
mongod --dbpath <path to empty dir different to main instance dir path> --port 27018 --replSet <replica set name specified in STEP 2>
```
4. Run `mongosh`.
```
mongosh

// or

mongosh -s <user>
```
5. Run the following command to initiate replica set.
```
rs.initiate()
```
6. Add slave server.
```
rs.add("<slave URL, e.g. 127.0.0.1:27018>")
```
7. Check replica set status.
```
rs.status()
```

---
#### Опишите структуру БД в СУБД MongoDB.

Cтруктура БД:

```
база данных => коллекция => документ(BSON (binary json))
```

---

#### Перечислите все функции API СУБД MongoDB с помощью которых можно извлечь данные из БД.

```js
db.collection.find()
```

```js
db.collection.findOne()
```

---

#### Перечислите все функции API СУБД MongoDB с помощью которых можно добавить данные в БД.

```js
db.collection.insertOne()
```

```js
db.collection.insertMany()
```

---

#### Перечислите все функции API СУБД MongoDB с помощью которых можно удалить данные в БД.

```js
db.collection.deleteOne()
```

```js
db.collection.deleteMany()
```

```js
db.collection.findOneAndDelete()
```

---

#### Перечислите все функции API СУБД MongoDB с помощью которых можно изменить данные в БД.

```js
db.collection.updateOne()
```

```js
db.collection.updateMany()
```

```js
db.collection.findOneAndUpdate()
```

---

#### Какие бывают транзакции в MongoDB? Перечислите порядок их создания.

-   Явная

    ```js
    const client = new MongoClient(URL)
    const transactionOptions = {
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    }

    await client.connect()

    const session = client.startSession()
    session.startTransaction(transactionOptions)

    // do stuff

    await session.abortTransaction()
    // or
    await session.commitTransaction()

    await session.endSession()
    ```

-   Неявная

    ```js
    const client = new MongoClient(URL)
    const transactionOptions = {
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    }

    await client.connect()

    const session = client.startSession()

    try {
        await session.withTransaction(async () => {
            // do stuff
        }, transactionOptions)
    } catch (e) {
        // catch error
    } finally {
        await session.endSession()
    }
    ```
