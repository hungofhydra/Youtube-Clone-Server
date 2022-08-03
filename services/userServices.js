const mongoose = require('mongoose');
const User = require('../models/User');
const createError = require('../errors/error');

const updateUserService = async (id, data) => {
    const updatedUser = await User.findOneAndUpdate({_id : id}, data, { new: true });
    if (!updatedUser) throw createError(500, 'Something went wrong'); 
    return updatedUser;
}

const deleteUserService = async (id) => {
    const updatedUser = await User.findOneAndRemove({_id : id});
    if (!updatedUser) throw createError(500, 'Something went wrong'); 
    return updatedUser;
}

const getUserService = async (id) => {
    const foundUser = await User.findById(id);
    if (!foundUser) throw createError(500, 'Something went wrong'); 
    return foundUser;
}

const subscribeService = async (userId, subscribedUserId) => {

    const user = await User.findByIdAndUpdate({_id: userId}, 
                                                              { $inc: { subscribers: 1 }, $push: { subscribedUsers: subscribedUserId } },
                                                              { new: true });
    if (!user) throw createError(500, 'Something went wrong');
    return user;
}

const unsubscribeService = async (userId, subscribedUserId) => {
    
    const user = await User.findByIdAndUpdate({_id: userId}, 
                                                              { $inc: { subscribers: -1 }, $pull: { subscribedUsers: subscribedUserId } },
                                                              { new: true });
    if (!user) throw createError(500, 'Something went wrong');
    return user;
}

module.exports = { 
    updateUserService,
    deleteUserService,
    getUserService,
    subscribeService,
    unsubscribeService
}