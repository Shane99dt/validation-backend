const express = require('express')
const app = express()
const users = require('../usersJS')
const { checkIfExists } = require('../RoutesMW/usersMW')
const slugify = require('slugify')
const { body, validationResult } = require('express-validator')

const passwordLessMessage = 'Password needs to be more than 8 characters'
const passwordMoreMessage = 'Password needs to be less than 20 characters'

app.get('/', (req, res) => {
  res.json(users).status(201)
})

app.get('/:slug', checkIfExists, (req, res) => {
  res.json(req.user).status(201)
})




app.post(
  '/',
  body('name').exists().isLength({min: 4}).withMessage('Name is not long enough'),
  body('password').exists().isLength({min: 8}).withMessage(passwordLessMessage).isLength({max: 20}).withMessage(passwordMoreMessage),
  body('email').exists().isEmail().withMessage('Not an email'),
  body('city').exists().custom(value => {
    const slugified = slugify(value, { lower : true})
    const slugifiedCities = ["paris", "tokyo", "los-angeles"]
    return slugifiedCities.includes(slugified)
  }).withMessage('City is invalid'),
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