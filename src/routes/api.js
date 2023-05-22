const router = require('express').Router();
const productController = require('../controllers/Product');

router.get('/', (req, res)=> {
    res.send('test')
})


//C Create
router.post('/product', productController.store);

//R Read
router.get('/product', productController.view);

//U Update
router.put('/product/:id', productController.update);

//D Delete
router.delete('/product/:id', productController.destroy);

// Read by id
router.get('/product/:id', productController.edit)


// Get Product With Pagination
router.get("/product-list/:pageNo/:perPage/:searchKey?",productController.prouctList);





module.exports = router;