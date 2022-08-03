const User = require('../models/User');
const createError = require('../errors/error');

const updateUserService = async (id, data) => {
    const updatedUser = await User.findOneAndUpdate(id, data, { new: true });
    if (!updatedUser) throw createError(500, 'Something went wrong'); 
    return updatedUser;
}

module.exports = { 
    updateUserService
}