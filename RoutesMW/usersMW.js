const users = require('../usersJS')

const checkIfExists = (req, res, next) => {
  const userExist = users.find(user => user.slug === req.params.slug )

  if(userExist){
    req.user = userExist
    next()
  }else{
    res.status(404).json("User doesn\'t exist")
  }
}

module.exports = { checkIfExists }