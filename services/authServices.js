const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const createError = require('../errors/error');


const signUpService = async (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const newUser = await User.create({...user, password : hashedPassword});
    if (!newUser) throw createError(500, "Something went wrong");
    return newUser;
 
};

const signInService = async (user) => {
    
    if(!user.name || !user.password) throw createError(400, "Please provide name and password");

    const userResult = await User.findOne({name : user.name});
    if (!userResult) throw createError(404, "User not found");

    const passwordMatched = await bcrypt.compareSync(user.password, userResult.password);
    if (!passwordMatched) throw createError(401, "Password is incorrect");

    const token = jwt.sign({id : userResult._id}, process.env.JWT_SECRET);
    
    return {token, userResult}; 
    
};

const googleLoginService = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return {token, user};
    } 
    else {
      const user = await User.create({
        ...data,
        fromGoogle: true,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return {token, user};
    }
}

module.exports = {
    signUpService,
    signInService,
    googleLoginService
}