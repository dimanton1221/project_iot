const express = require('express');
const router = express.Router();

// /dashboard
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'You are authorized to see this message.'
    });
});

module.exports = router;