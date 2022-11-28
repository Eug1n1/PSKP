#### Перечислите параметры соединения с сервером БД.

- **user** - User name to use for authentication.
- **password** - Password to use for authentication.
- **server** - Server to connect to. You can use 'localhost\\instance' to connect to named instance.
- **port** - Port to connect to (default: `1433`). Don't set when connecting to named instance.
- **domain** - Once you set domain, driver will connect to SQL Server using domain login.
- **database** - Database to connect to (default: dependent on server configuration).
- **connectionTimeout** - Connection timeout in ms (default: `15000`).
- **requestTimeout** - Request timeout in ms (default: `15000`). NOTE: msnodesqlv8 driver doesn't support timeouts < 1 second. When passed via connection string, the key must be `request timeout`
- **stream** - Stream recordsets/rows instead of returning them all at once as an argument of callback (default: `false`). You can also enable streaming for each request independently (`request.stream = true`). Always set to `true` if you plan to work with large amount of rows.
- **parseJSON** - Parse JSON recordsets to JS objects (default: `false`). For more information please see section [JSON support](#json-support).
- **pool.max** - The maximum number of connections there can be in the pool (default: `10`).
- **pool.min** - The minimum of connections there can be in the pool (default: `0`).
- **pool.idleTimeoutMillis** - The Number of milliseconds before closing an unused connection (default: `30000`).
- **arrayRowMode** - Return row results as a an array instead of a keyed object. Also adds `columns` array. (default: `false`)

[Источник](https://github.com/tediousjs/node-mssql)


Конфиг который у меня заработал:

```js
const config = {
    user: 'sa',
    password: 'Pass-123',
    server: 'localhost',
    database: 'nodejs',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 4,
    },
}
```

---
#### Перечислите группы SQL-операторов и операторы, входящие в эти группы.

- DDL (Data Definition Language)
    - create
    - alter 
    - drop
- DML (Data Manipulation Language) 
    - select
    - insert
    - update
    - delete
- DCL (Data Control Language)
    - grant
    - revoke
    - deny
- TCL (Transaction Control Language)
    - begin transaction
    - commit
    - rollback
    - save

---
#### Поясните понятие «результирующий набор».

Результирующий набор — это объект, представляющий набор данных, которые возвращаются из источника данных, как правило в результате запроса.

[Источник](https://learn.microsoft.com/ru-ru/sql/connect/jdbc/managing-result-sets-with-the-jdbc-driver?view=sql-server-ver16)

---
#### Поясните понятия «транзакция», «фиксация транзакции», «откат транзакции». Как создать транзакцию с помощью пакета mssql.

- Транзакция - это механизм базы данных, позволяющий таким
образом объединять несколько операторов, изменяющих базу данных, чтобы
при выполнении этой совокупности операторов они или все выполнились или
все не выполнились.
- Фиксация транзакции – сохранение нового состояния БД, фиксация изменений произведенных в рамках фиксируемой транзакции.
- Откат транзакции – возвращение БД в состояние как до начала транзакции, откат изменений произведенных в рамках фиксируемой транзакции.

```js
// https://github.com/tediousjs/node-mssql#transaction

const transaction = new sql.Transaction(/* [pool] */)
transaction.begin(err => {
    // ... error checks

    const request = new sql.Request(transaction)
    request.query('insert into mytable (mycolumn) values (12345)', (err, result) => {
        // ... error checks

        transaction.commit(err => {
            // ... error checks

            console.log("Transaction committed.")
        })
    })
})
```

---
#### Поясните понятие «пул соединений» и его назначение

Механизм позволяющий ускорить выполнение запросов к БД, за счет некоторого числа постоянно открытых соединений.
При запросе соединения пул выделяет одно из своих свободных соединений, если такое имеется, а если свободных нет, то пул ожидает освобождения одного из занятых и выделяет его. Также при необходимости пул может открывать новые соединения.

Важные параметры пула соединений:
- max - максимальное кол-во единовременно открытых соединений.
- min - сколько соединений пул должен всегда держать открытыми.
- idleTimeoutMillis - время после которого закроется неиспользуемое соединение.

