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
