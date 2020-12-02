const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const readline = require('readline') . createInterface({
    input: process. stdin,
    output:process.stdout
    })

app = express();
port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);
console.log('Client app started on port: ' +port);

// set the server address
var server = "http://localhost:3000/"; 

// declare variables
var route, method, body, url;



// this handles getting the route and method from the CL calls the fetch_data function to make the request

var readIn = function(){
    readline.question('Enter the route: '+server, (input_route)=>{
        route = input_route;
        url = server+route;
        readline.question('Method: ', (input_method)=>{
            method = input_method.toUpperCase();
            if((method == 'GET')||(method == '')||(method == 'DELETE')){
                fetch_data(url,method);
            }else if((method == 'POST')||(method == 'PUT')){
                readline.question('Body(json format): ', (input_body)=>{
                    body = input_body;
                    fetch_data(url, method,body);
                })
            }else{
                console.log('invalid method');
            }
        });
    });
}

readIn();


// this function makes the http request to the server specified, ouputs the response, and restarts the process.
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
        .then((response) => response.text())
        .then((data) =>{
            try{
                data = JSON.parse(data);
                console.log(data);
            }catch(parse_error){
                console.log(data)
            }
            finally{
                console.log('________________________________________________________\n')  //just house keeping
                readIn()    //restart the process
            }
        })
        .catch((err) =>{
            console.log(err)
            console.log('________________________________________________________\n')   //just house keeping
            readIn()       //restart the process
        });
}
