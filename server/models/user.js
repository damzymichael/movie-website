const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.statics.signup = async function (username, password) {
  //validation
  if(!username || !password) throw Error('All fields must be filled')

  //check if username exists
  const exists = await this.findOne({username})
  if(exists) throw Error('Username already in use, choose another username')

  //hash password
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  hash = hash.toString();

  const user = await this.create({username, password: hash})
  return user
}

userSchema.statics.login = async function(username, password){
  if (!username || !password) throw Error("All fields must be filled");
  const user = await this.findOne({ username });
  if (!user) throw Error("Username not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");
  return user;
}

module.exports = mongoose.model('user', userSchema) 