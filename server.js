const express = require('express')
const app = express()
const bookRouter = require('./routes/bookroutes')

app.use(express.json())
app.use('/api/v1/books', bookRouter)

const port = 5000

app.listen(port, console.log(`Server is listening on port ${port}`))