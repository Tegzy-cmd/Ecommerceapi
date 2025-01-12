const router = require('express').Router();


router.get('/usertest', (req, res) => {
    res.send('User test route');
});



module.exports = router;