const express = require('express');

const { addVideo,
        updateVideo,
        deleteVideo,
        getVideo, 
        addView,
        trend,
        random,
        sub} = require('../controllers/video');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');


router.post('/',verifyToken, addVideo);
router.put('/:id',verifyToken, updateVideo);
router.get('/find/:id', getVideo);
router.delete('/:id',verifyToken, deleteVideo );
router.put('/view/:id', addView );
router.get('/trend',  trend);
router.get('/random',  random);
router.get('/sub',  sub);

module.exports = router;    