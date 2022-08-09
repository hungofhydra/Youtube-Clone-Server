const { addCommentService, deleteCommentService, getCommentsService } = require('../services/commentService');


const addComment = async (req, res, next) => {
  try {
    const result = await addCommentService(req.user.id, req.body);
    res.status(200).json({statusCode: 200, message: 'Comment added successfully', data : result});
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
    try {
        const result = await deleteCommentService(req.user.id, req.params.id);
        res.status(200).json({statusCode: 200, message: 'Comment deleted successfully', data : result});
    } catch (error) {
        next(error)
    }
};


const getComments = async (req, res, next) => {
  try {
        const result = await getCommentsService(req.params.videoId);
        res.status(200).json({statusCode: 200, message: 'Comments found successfully', data : result});
  } catch (err) {
    next(err);
  }
};

module.exports = {
    addComment,
    deleteComment,
    getComments

}