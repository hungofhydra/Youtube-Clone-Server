const { addVideoService, updateVideoService, deleteVideoService, getVideoService } = require('../services/videoServices');
const createError = require('../errors/error');


const addVideo = async (req, res, next) => {
    try {
        const result = await addVideoService(req.user.id, req.body);
        return res.status(200).json({statusCode: 200, message: 'Video added successfully'});
    } catch (error) {
        next(error)
    }
}

const updateVideo = (req, res, next) => {
    try {
        const result = updateVideoService(req.user.id, req.params.id, req.body);
        return res.status(200).json({statusCode: 200, message: 'Video updated successfully'});
    } catch (error) {
        next(error)
    }
}

const deleteVideo = (req, res, next) => {
    try {
        const result = deleteVideoService(req.user.id, req.params.id);
        return res.status(200).json({statusCode: 200, message: 'Video deleted successfully'});
    } catch (error) {
        next(error)
    }
}

const getVideo = (req, res, next) => {
    try{
        const result = getVideoService(req.params.id);
        return res.status(200).json({statusCode: 200, message: 'Video found successfully', data: result});
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo
}