const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers; //taking out the authorization from the headers passed.
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }
  const token = authorization.split(" ")[1]; //splitting the authorization "Bearer awdaw...." and taking just the token part
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id"); //matching the token which was passed and the jwt secret to take out the id and finding that id in the User model and if that is found then taking out the id of the user
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
