const router = require('express').Router();
const IncidentController = require('../controllers/IncidentController');

router.post('/', IncidentController.create);
router.get('/', IncidentController.list);
// router.get('/:id', IncidentController.find);
router.delete('/:id', IncidentController.delete);

module.exports = router;