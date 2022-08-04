const Comment = require('../models/Comment');
const Video = require('../models/Video');
const createError = require('../errors/error');


const addCommentService =  async (userId, data) => {
    const newComment = await Comment.create({ ...data, userId: userId });
    if (!newComment) {
        throw createError(400, "Comment not created");
    }
    return newComment;
}

const deleteCommentService = async (userId , id ) => {
    
    const comment = await Comment.findById(id);
    const video = await Video.findById(id);
    if (userId === comment.userId || userId === video.userId) {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            throw createError(400, "Comment not deleted, something is wrong with server");
        }
        return deletedComment;
    } 
    throw createError(403, "You can delete own your comment!");
     
}

const getCommentsService = async (videoId) => {
    const comments = await Comment.find({ videoId: videoId });
    return comments;
}



module.exports = { 
    addCommentService,
    deleteCommentService,
    getCommentsService
}