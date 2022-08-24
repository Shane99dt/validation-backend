const express = require('express')
const app = express()
const users = require('../usersJS')
const { checkIfExists } = require('../RoutesMW/usersMW')
const slugify = require('slugify')
const { body, validationResult } = require('express-validator')

app.get('/', (req, res) => {
  res.json(users).status(201)
})

app.get('/:slug', checkIfExists, (req, res) => {
  res.json(req.user).status(201)
})

app.post(
  '/',
  body('name').exists().isLength({min: 4}),
  body('password').exists().isLength({min: 8}).isLength({max: 20}),
  body('email').exists().isEmail(),
  body('city').exists().isIn(['Paris', 'Tokyo', 'Los Angeles']),
  body('profile_picture').optional(),
  (req, res) => {

    const { errors } = validationResult(req)

    if(errors.length > 0){
      res.status(400).json(errors)
    }else{
      const newUser = {
        ...req.body,
        slug: slugify(req.body.name)
      }
      users.push(newUser)
      res.status(201).json(newUser)
    }
  }
)








module.exports = app