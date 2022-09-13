const express =  require('express');
const router = express.Router();

const IndexController = require('./controllers/IndexController');

router.get('/classes', IndexController.getAllClasses);
router.get('/classe/:id', IndexController.onlyClasse);
router.post('/classe', IndexController.insert);
router.put('/classe/:id', IndexController.change);
router.delete('/classe/:id', IndexController.delete);

module.exports = router;