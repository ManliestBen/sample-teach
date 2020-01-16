var express = require('express');
var router = express.Router();
var todosCtrl = require('../../controllers/api/todos');

router.get('/', todosCtrl.index);
router.post('/', todosCtrl.create);
router.delete('/:id', todosCtrl.delete);
router.put('/:id', todosCtrl.update);

module.exports = router;