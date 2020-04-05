const router = require('express').Router();
const OngController = require('../controllers/OngController');

router.get('/', OngController.list);
router.post('/', OngController.create);


module.exports = router;