const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const readline = require('readline') . createInterface( {
    input: process. stdin,
    output:process.stdout
    })

app = express();
port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);
console.log('Client app started on: port' +port);

var server = "http://localhost:3000/products";
var route;
var method;
var body;
var url;


readline.question('Enter the route: http://localhost:3000/', (input_route)=>{
    // console. log(`Hi ${input_route}!`);
    route = input_route;
    url = 'http://localhost:3000/'+route;
    readline.question('Method: ', (input_method)=>{
        method = input_method.toUpperCase();
        if((method == 'GET')||(method == '')||(method == 'DELETE')){
            fetch_data(url,method);
        }else if((method === 'POST')||(method == 'PUT')){
            readline.question('Body: ', (input_body)=>{
                body = input_body;
                readline.close();
                fetch_data(url, method,body);
            })
        }else{
            console.log('invalid method');
        }
        // readline. close();
    });
    // readline. close();
});

var fetch_data = function(url, method, body){
    var options = {
        method: method,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: body
    };
    fetch(url,options)
        // .then((response) => response.json())
        .then((response)=> response.text())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

// .then((response) => response.json())

// var post_data = function(){

// }
// var options = {
//     method: 'POST',
//     // mode: 'cors',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify({
//         "code": "code3",
//         "name": "name3",
//         "color": "violet",
//         "brand": "brand3"
//     })
// };


// fetch(client,options)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));