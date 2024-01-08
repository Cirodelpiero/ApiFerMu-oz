const { list, detail, create, update, destroy} = require('../../controllers/moviesController');

const router = require('express').Router();
/* /api/v1/movies */

router.get('/', list),
router.get('/:id', detail)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',destroy)



module.exports = router