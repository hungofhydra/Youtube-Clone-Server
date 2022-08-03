
const { updateUserService } = require('../services/userServices');
const createError = require('../errors/error');

const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const result = await updateUserService(req.params.id, req.body);
            return res.status(200).json({statusCode: 200, message: 'User updated successfully', data: result});
        } catch (error) {
            next(error);
        }
    }
    return next(createError(400, "You can only update your own profile"));
    
}

const deleteUser = (req, res, next) => {
}

const getUser = (req, res, next) => {
}

const subscribe = (req, res, next) => {
}

const unsubscribe = (req, res, next) => {
}

const like = (req, res, next) => {
}

const dislike = (req, res, next) => {
}



module.exports = {
    updateUser,
    deleteUser,
    getUser,
    subscribe,
    unsubscribe,
    like,
    dislike
}