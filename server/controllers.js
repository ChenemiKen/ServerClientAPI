var products = require('./model')  //Model

//____________ Controllers____________________________________

var get_all_products = function(req, res){
    console.log('Sending data for all products...');
    response_data = {
        "message": "All Products",
        "Products": products
    }
    res.status(200).json(response_data);
    console.log(response_data);
}


var create_product = function(req, res){
    var new_prod = req.body;
    if(products[new_prod.code]){     //check if the a product the same product_code already exists
        response_data = {
            "message": "product with code: "+new_prod.code+' already exists.',
        };
        status=300;
    }else{
        console.log('Creating new product: '+new_prod.code+'...');
        products[new_prod.code]= new_prod;
        response_data = {
            "message": "New product created: "+new_prod.code,
            "Products": products
        };
        status=200;
    }
    res.status(status).json(response_data);
    console.log(response_data);
}


var get_a_product = function(req, res){
    var prod_id = req.params['productID'];
    var prod = products[prod_id];
    if(!(prod)){            //check if the requested product exists
        console.log('Request recieved for product: '+prod_id+' ... No such product exists');
        response_data = {
            "message": "Sorry, No such product exits.",
        };
        status=404;
    }else{
        console.log('Sending data for: '+prod_id+'...');
        response_data = {
            "message": "product: "+prod_id,
            product: prod
        };
        status=200;
    }
    res.status(status).json(response_data);
    console.log(response_data);
}


var update_a_product = function(req, res){
    var prod_id = req.params['productID'];
    var prod_update = req.body;
    if(!(products[prod_id])){   //check whether the product to be updated exists
        console.log('Update recieved for product: '+prod_id);
        response_data = {
            "message": "Sorry, No such product exits.",
        };
        status=404;
    }else{
        products[prod_id]= prod_update;
        response_data = {
            "message": "Updated the product: " +prod_id,
            "Products": products
        };
        status=200
    }
    res.status(status).json(response_data);
    console.log(response_data);
};


var delete_a_product = function(req, res){
    var prod_id = req.params['productID'];
    if(products[prod_id]){    //check whether the product to be deleted exists
        delete products[prod_id];
        response_data = {
            "message": "Deleted the product: " +prod_id,
            "Products": products
        };
        status=200
    }else{
        response_data = {
            "message": "Product: '"+prod_id+"' does not exist",
        };
        status=404
    }
    res.status(status).json(response_data);
    console.log(response_data);
};

var wrong_route = function(reg, res){
    response_data = {
        "message": "Wrong Route!",
        "Available routes":{
            '/products': 'GET, POST',
            '/products/{prod_id}': 'GET, PUT, DELETE',
            '/api-docs': 'GET'
        }
    }
    res.status(404).json(response_data);
}

module.exports ={
    get_all_products : get_all_products,
    create_product : create_product,
    get_a_product : get_a_product,
    update_a_product : update_a_product,
    delete_a_product : delete_a_product,
    wrong_route : wrong_route
}