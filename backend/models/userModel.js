const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method :
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled"); //json error message which will be displayed on the front end
  }

  if (!validator.isEmail(email)) {
    //returns true if the email is valid
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email }); //checking if the email is already used by another user.
  if (exists) {
    throw Error("Email already in use"); //we dont have access to response function
  }
  const salt = await bcrypt.genSalt(10); //generating a random string which will get attached to the password before hashing
  const hash = await bcrypt.hash(password, salt); //hashing the password

  const user = await this.create({ email, password: hash }); //creating a document in mongo

  return user;
};

//static login method :
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled"); //json error message which will be displayed on the front end
  }

  const user = await this.findOne({ email }); //checking if the email is in the database
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password); //compare function compares the text password and the hashed password automatically - returns true or false
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
