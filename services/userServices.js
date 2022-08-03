const User = require('../models/User');
const createError = require('../errors/error');

const updateUserService = async (id, data) => {
    const updatedUser = await User.findOneAndUpdate({_id : id}, data, { new: true });
    if (!updatedUser) throw createError(404, `There is no user with id  ${id}}`); 
    return updatedUser;
}

const deleteUserService = async (id) => {
    const deletedUser = await User.findOneAndRemove({_id : id});
    if (!deletedUser) throw createError(404, `There is no user with id  ${id}}`); 
    return deletedUser;
}

const getUserService = async (id) => {
    const foundUser = await User.findById(id);
    if (!foundUser) throw createError(404, `There is no user with id  ${id}}`); 
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