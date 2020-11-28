const express = require('express');
const bodyParser = require('body-parser');

app = express();
port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Model
var products = {'product1':{'code':'product1', 'name':'name1','color':'red','brand':'brand1'}
                };

// Controllers
var list_all_products = function(req, res){
    console.log('Sending data for all products');
    res.json(products);
    console.log(products);
}

var create_product = function(req, res){
    var new_prod = req.body;
    products[new_prod.code]= new_prod;
    console.log('New product created: \n' +new_prod.code);
    res.json(products);
}

var get_a_product = function(req, res){
    // console.log(req.params);
    var prod_id = req.params['productID'];
    var prod = products[prod_id];
    if(!(prod)){
        console.log('Request recieved for product: '+prod_id+' ... No such product exists');
        res.status(400).json('Sorry, No such product exits.')
    }else{
        console.log('Sending data for: '+prod_id);
        res.json(prod);
    }
}

var update_a_product = function(req, res){
    var prod_id = req.params['productID'];
    var prod_update = req.body;
    products[prod_id]= prod_update;
    console.log('Updated the product: ' +prod_id);
    res.json(products);
};
var delete_a_product = function(req, res){
    var prod_id = req.params['productID'];
    if(products[prod_id]){
        delete products[prod_id];
        console.log('Deleted product: '+prod_id);
        res.send('Deleted product: '+prod_id)
    }else{
        console.log('Product: '+prod_id+' does not exist');
        res.send('Product: '+prod_id+' does not exist');
    }
    
};
   

// Routes
app.route('/products')
    .get(list_all_products)
    .post(create_product);
  
app.route('/products/:productID')
    .get(get_a_product)
    .put(update_a_product)
    .delete(delete_a_product);
  

app.listen(port);

console.log('API server started on: port' + port);