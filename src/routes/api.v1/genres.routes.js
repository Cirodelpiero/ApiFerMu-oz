const { list, detail} = require('../../controllers/genresController');

const router = require('express').Router();
/* /api/v1/genres */

router.get('/', list),
router.get('/:id', detail)




module.exports = router