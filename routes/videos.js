const express = require('express');

const { addVideo,
        updateVideo,
        deleteVideo,
        getVideo } = require('../controllers/video');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');


router.post('/',verifyToken, addVideo);
router.put('/:id',verifyToken, updateVideo);
router.get('/find/:id', getVideo);
router.delete('/:id',verifyToken, deleteVideo );
router.put('/view/:id', );
router.get('/trend',  );
router.get('/random',  );
router.get('/sub',  );

module.exports = router;    