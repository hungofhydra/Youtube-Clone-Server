
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
        return res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({statusCode: 200, message: 'User logined successfully', data: user, token});
   
    } catch (err) {
      next(err);
    }
  };

  const logout = async (req, res) => {
    
    res.cookie('access_token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: 'User logged out successfully' })
}

module.exports = {
    signUp,
    signIn,
    googleAuth,
    logout
}