const express = require('express')
const app = express()

app.use(express.json())
app.use('/', require('./routers/getRouter'))
app.use('/', require('./routers/postRouter'))
app.use('/', require('./routers/putRouter'))
app.use('/', require('./routers/deleteRouter'))


app.listen(process.env.PORT ?? 3000)
