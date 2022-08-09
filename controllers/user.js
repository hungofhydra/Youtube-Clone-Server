//id 62e9fa400dbe4604b0841e35
const { likeVideoService, dislikeVideoService } = require('../services/videoServices');
const { updateUserService, deleteUserService, getUserService, subscribeService,unsubscribeService } = require('../services/userServices');
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

const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const result = await deleteUserService(req.params.id);
            return res.status(200).json({statusCode: 200, message: 'User deleted successfully'});
        } catch (error) {
            next(error);
        }
    }
    return next(createError(400, "You can only delete your own account"));
}

const getUser = async (req, res, next) => {
    try {
        const result = await getUserService(req.params.id);
        return res.status(200).json({statusCode: 200, message: 'User founded successfully', data: result});
    } catch (error) {
        next(error);
    }
   
}

const subscribe = async (req, res, next) => {
    try {
        const result = await subscribeService(req.user.id, req.params.id);
        return res.status(200).json({statusCode: 200, message: 'User subscribed successfully'});
    } catch (error) {
        next(error);
    }
}

const unsubscribe = async (req, res, next) => {
    try {
        const result = await unsubscribeService(req.user.id, req.params.id);
        return res.status(200).json({statusCode: 200, message: 'User ubsubscribed successfully'});
    } catch (error) {
        next(error);
    }
}

const like = async (req, res, next) => {
    try {
      await likeVideoService(req.user.id, req.params.videoId);
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
}

const dislike = async (req, res, next) => {
    try {
        await dislikeVideoService(req.user.id, req.params.videoId);
        res.status(200).json("The video has been disliked.")
      } catch (err) {
        next(err);
      }
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