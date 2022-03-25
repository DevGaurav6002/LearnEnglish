const Users = require('../model/user')
const asyncWrapper = require('../middleware/async')
const {customErrorHandler} = require('../error/customAPIError')
const {CustomAPIError} = require('../error/customAPIError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = asyncWrapper (async (req,res) => {
    const {email, password} = req.body

    if(!email || !password){
      throw new CustomAPIError('please provide email and password', 401)
    }

    const user = await Users.findOne({email})

    if(!user){
      throw new CustomAPIError('Invalid Credentials', 401)
    }

    //compare password

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
      throw new CustomAPIError('Invalid Credentials', 401)
    }

    const token = jwt.sign({id: user._id, name: user.name}, process.env.jwtSecret, {expiresIn: '30d'})

    res.status(200).json({user:{name:user.name}, token})

})

const register = asyncWrapper( async (req, res, next) => {
    const {name, email, password} = req.body
    if(name === "" || email === "" || password === ""){
      return next(customErrorHandler("please fill all the details", 404))
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const tempCred = {name, email, password: hashedPassword}

    //storing in DB
    const user = await Users.create({ ...tempCred })

    //signing JWT
    const token = jwt.sign({id: user._id, name: user.name}, process.env.jwtSecret, {expiresIn: '30d'})
    
    //sendinng response
    res.status(200).json({ user: { name: user.name }, token})
  })

module.exports = {
        register,
        login
    }