var express = require('express');
var router = express.Router();

var controllers = require('./controllers'); //Controllers 

//________ Routes________________________________________

router.get('/products', controllers.get_all_products);
router.post('/products', controllers.create_product);

router.get('/products/:productID', controllers.get_a_product);
router.put('/products/:productID', controllers.update_a_product);
router.delete('/products/:productID', controllers.delete_a_product);
router.all('*', controllers.wrong_route);

// route('/products')
//     .get(controllers.get_all_products)
//     .post(controllers.create_product);
  
// route('/products/:productID')
//     .get(controllers.get_a_product)
//     .put(controllers.update_a_product)
//     .delete(controllers.delete_a_product);

    // to handle invalid routes.
// app.use('*',(req, res) =>{
//     response_data = {
//         "message": "Wrong Route!",
//         "routes":{
//             '/products': 'GET, POST',
//             '/products/{prod_id}': 'GET, PUT, DELETE',
//             '/api-docs': 'GET'
//         }
//     }
//     res.status(404).json(response_data);
// })

module.exports = router;