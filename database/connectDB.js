const mongoose = require('mongoose')

function connectDB(uri){
    mongoose.connect(uri)
}

module.exports = connectDB