const moongoose = require('mongoose');

const { signUpService ,signInService} = require('../services/authServices');
const createError = require('../errors/error');
const { json } = require('express');
const { sign } = require('jsonwebtoken');


const signUp = async (req, res, next) => {    

    try {
        const result = await signUpService(req.body);
        res.status(200).json({statusCode: 200, message: 'User created successfully', data: result});
    }
    catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {

     try {
        const token = await signInService(req.body);
        res
        .cookie("access_token", token, {
        httpOnly: true,
        })
        .status(200)
        .json({statusCode: 200, message: 'User loginned successfully', token});
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    signUp,
    signIn
}