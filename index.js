const express = require('express')
const app = express()
const port = 5000
const morgan = require('morgan')
const cors = require('cors')
const usersRoutes = require('./routes/usersRoutes')


app.use(morgan('tiny'))

app.use(cors())

app.use(express.json())

app.listen(port, (req, res) => {
  console.log(`Running on port ${port}`)
})

app.use('/users', usersRoutes)
