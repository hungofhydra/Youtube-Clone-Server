
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const { signUpService ,signInService, googleLoginService} = require('../services/authServices');


const signUp = async (req, res, next) => {    

    try {
        const result = await signUpService(req.body);
        return res.status(200).json({statusCode: 200, message: 'User created successfully', data: result});
    }
    catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {

    try {
        const {token, userResult} = await signInService(req.body);
        return res
        .cookie("access_token", token, {
        httpOnly: true,
        })
        .status(200)
        .json({statusCode: 200, message: 'User logined successfully', data : userResult, token});
    }
    catch (err) {
        next(err);
    }

};

const googleAuth = async (req, res, next) => {
    try {
        const {token, user} = await googleLoginService(req.body);
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    //   const user = await User.findOne({ email: req.body.email });
    //   if (user) {
    //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //     res
    //       .cookie("access_token", token, {
    //         httpOnly: true,
    //       })
    //       .status(200)
    //       .json(user._doc);
    //   } else {
    //     const newUser = User.create({
    //       ...req.body,
    //       fromGoogle: true,
    //     });
    //     console.log(newUser);
    //     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    //     res
    //       .cookie("access_token", token, {
    //         httpOnly: true,
    //       })
    //       .status(200)
    //       .json(newUser._doc);
    //  }
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    signUp,
    signIn,
    googleAuth
}