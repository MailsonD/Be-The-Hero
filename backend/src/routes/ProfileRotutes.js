const router = require('express').Router();
const ProfileController = require('../controllers/ProfileController');

router.get('/', ProfileController.list);



module.exports = router;