const createError = require('../errors/error');
const Video = require('../models/Video');

const addVideoService = async (userId ,data) => {
    const addedVideo = await Video.create({userId, ...data});
    if (!addedVideo) throw createError(500, 'Something went wrong');
    return addedVideo;
}

const updateVideoService = async (userId , videoId, data) => {
    const video = await Video.findById(videoId);
    if (!video) throw createError(404, `There is no video with id  ${videoId}}`); 

    if (userId === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(videoId, data, { new: true });
        if (!updatedVideo) throw createError(500, 'Something went wrong');
        return updatedVideo;
    } 
    throw createError(403, 'You are not allowed to update this video');
}


const deleteVideoService = async (userId , videoId) => {
    const video = await Video.findById(videoId);
    if (!video) throw createError(404, `There is no video with id  ${videoId}}`); 

    if (userId === video.userId) {
        const updatedVideo = await Video.findByIdAndRemove(videoId);
        if (!updatedVideo) throw createError(500, 'Something went wrong');
        return updatedVideo;
    } 
    throw createError(403, 'You are not allowed to delete this video');
}

const getVideoService = async (videoId) => {
    const video = await Video.findById(videoId);
    if (!video) throw createError(404, `There is no video with id  ${videoId}}`); 
    return video;
}

const increaseViewService = async (videoId) => {
    const result = await Video.findByIdAndUpdate({_id : videoId}, { $inc: { views: 1 } }, { new: true });
    if (!result) throw createError(500, 'Something went wrong');
    return result;
}

module.exports = { 
    addVideoService,
    updateVideoService,
    deleteVideoService,
    getVideoService,
    increaseViewService,
    
};