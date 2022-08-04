const { 
    addVideoService, 
    updateVideoService, 
    deleteVideoService, 
    getVideoService, 
    increaseViewService, 
    randomVideoService, 
    trendVideoService, 
    subService,
    getVideoByTagService,
    searchVideoService } = require('../services/videoServices');
const createError = require('../errors/error');


const addVideo = async (req, res, next) => {
    try {
        const result = await addVideoService(req.user.id, req.body);
        return res.status(200).json({statusCode: 200, message: 'Video added successfully', data : result});
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

const random = async (req, res, next) => {
    try{
        const result = await randomVideoService();
        return res.status(200).json({statusCode: 200, message: 'Random video found successfully', data: result});
    }
    catch(error){
        next(error)
    }
}


const trend = async (req, res, next) => {
    try{
        const result = await trendVideoService();
        return res.status(200).json({statusCode: 200, message: 'Generated trend video successfully', data: result});
    }
    catch(error){
        next(error)
    }
}

const sub = async (req, res, next) => {
    try{
        const result = await subService(req.user.id);
        return res.status(200).json({statusCode: 200, message: 'Get video from subscribed channel success', data: result});
    }
    catch(error){
        next(error)
    }
}

const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try{
        const result = await getVideoByTagService(tags);
        return res.status(200).json({statusCode: 200, message: 'Get video with tag success', data: result});
    }
    catch(error){
        next(error)
    }
}

const search = async (req, res, next) => {
    const query = req.query.q;
    try{
        const result = await searchVideoService(query);
        return res.status(200).json({statusCode: 200, message: 'Get video from subscribed channel success', data: result});
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    addView,
    random,
    trend,
    sub,
    getByTag,
    search
}