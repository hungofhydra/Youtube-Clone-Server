const { addVideoService, updateVideoService, deleteVideoService, getVideoService, increaseViewService, randomVideoService } = require('../services/videoServices');
const createError = require('../errors/error');


const addVideo = async (req, res, next) => {
    try {
        const result = await addVideoService(req.user.id, req.body);
        return res.status(200).json({statusCode: 200, message: 'Video added successfully'});
    } catch (error) {
        next(error)
    }
}

const updateVideo = async (req, res, next) => {
    try {
        const result = await updateVideoService(req.user.id, req.params.id, req.body);
        return res.status(200).json({statusCode: 200, message: 'Video updated successfully'});
    } catch (error) {
        next(error)
    }
}

const deleteVideo = async (req, res, next) => {
    try {
        const result = await deleteVideoService(req.user.id, req.params.id);
        return res.status(200).json({statusCode: 200, message: 'Video deleted successfully'});
    } catch (error) {
        next(error)
    }
}

const getVideo = async (req, res, next) => {
    try{
        const result = await getVideoService(req.params.id);
        return res.status(200).json({statusCode: 200, message: 'Video found successfully', data: result});
    }
    catch(error){
        next(error)
    }
}

const addView = async (req, res, next) => {
    try{
        const result = await increaseViewService(req.params.id);
        return res.status(200).json({statusCode: 200, message: 'Increases view successfully'});
    }
    catch(error){
        next(error)
    }
}

const random = (req, res, next) => {
    try{
        const result = randomVideoService();
        return res.status(200).json({statusCode: 200, message: 'Video found successfully', data: result});
    }
    catch(error){
        next(error)
    }
}

// const trend = (req, res, next) => {
//     try{
//         const result = getVideoService(req.params.id);
//         return res.status(200).json({statusCode: 200, message: 'Video found successfully', data: result});
//     }
//     catch(error){
//         next(error)
//     }
// }

// const sub = (req, res, next) => {
//     try{
//         const result = getVideoService(req.params.id);
//         return res.status(200).json({statusCode: 200, message: 'Video found successfully', data: result});
//     }
//     catch(error){
//         next(error)
//     }
// }

module.exports = {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    addView,
    random,
    //trend,
    //sub
}