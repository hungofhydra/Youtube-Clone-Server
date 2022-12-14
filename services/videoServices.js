const createError = require('../errors/error');
const Video = require('../models/Video');
const { getUserService } = require('./userServices');

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

const randomVideoService = async () => {
    const result = await Video.aggregate([{ $sample: { size: 40 } }]);
    if (!result) throw createError(500, 'Something went wrong');
    return result;
}

const trendVideoService = async () => {
    const result = await Video.find().sort({views : -1})
    if (!result) throw createError(500, 'Something went wrong');
    return result;
}

const subService = async (userId) => {
    const user = await getUserService(userId);
    if (!user) throw createError(404, `There is no user with id  ${userId}}`); 
    const subscribedUsers = user.subscribedUsers;
    
    const list = await Promise.all(subscribedUsers.map( (channelId) => {return Video.find({userId : channelId})}));
    if (!list) throw createError(500, 'Something went wrong');
    return list.flat().sort((a, b) => b.createdAt - a.createdAt);
}

const getVideoByTagService = async (tags) => {
    const videos = await Video.find({tags : {$in : tags}}).limit(20);
    return videos;
}

const searchVideoService = async (query) => {
    const videos = await Video.find({title : {$regex : query, $options : 'i'}}).limit(20);
    return videos;
}

const likeVideoService = async (userId, videoId) => {
    const result = await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:userId},
        $pull:{dislikes:userId}
      })
    if (!result) throw createError(500, 'Something went wrong');
    return result;
}

const dislikeVideoService = async (userId, videoId) => {
    const result =  await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:userId},
        $pull:{likes:userId}
      })
    if (!result) throw createError(500, 'Something went wrong');
    return result;
}

module.exports = { 
    addVideoService,
    updateVideoService,
    deleteVideoService,
    getVideoService,
    increaseViewService,
    randomVideoService,
    trendVideoService,
    subService,
    getVideoByTagService,
    searchVideoService,
    likeVideoService,
    dislikeVideoService
};