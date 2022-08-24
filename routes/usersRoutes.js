const express = require('express')
const app = express()
const users = require('../usersJS')

app.get('/', (req, res) => {
  res.json(users)
})

module.exports = app