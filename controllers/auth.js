const moongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const createError = require('../errors/error');

const signUp = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await User.create({...req.body, password : hashedPassword});
        if (newUser) res.status(200).send("User created successfully");
    } catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({name : req.body.name});
        if (!user) next(createError(404, "User not found"));

        const passwordMatched = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatched) next(createError(401, "Password is incorrect"));
    
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        
        res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signUp,
    signIn
}