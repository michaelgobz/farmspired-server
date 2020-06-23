const mongoose = require('mongoose')
const user_schema = mongoose.Schema()

user_schema = new Schema({
  first_name: String,
  Second_name: String,
  Address: String,
  Email: String,
  Password:String
})

const user = mongoose.model(user_schema, "Users")
module.exports = user;


