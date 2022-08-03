const express = require('express');

const { updateUser,
        deleteUser,
        getUser,
        subscribe,
        unsubscribe,
        like,
        dislike } = require('../controllers/user');
const router = express.Router();

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/find/:id', getUser);

router.put('/sub/:id', subscribe);

router.put('/unsub/:id', unsubscribe);

router.put('/like/:videoId', like);

router.put('/dislike/:videoId', dislike);
module.exports = router;    