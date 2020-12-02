Hello!


The serverClientApi folder contains the two apps, the Server and the Client. 

To start up the apps, navigate into the folder on your command line (e.g. navigate to ".../serverClientApi/server” for the server app). Then run:  

npm install

This will install all the dependencies listed in the package.json file. It will create the node-modules folder. When that is done, you are now ready to start the app. Run:

node index

Do this for the both apps.

The Server

The sever app uses an array as db as discussed, this is in the variable "products".
The controllers sections contains the functions that handle the different requests.
The routes section handles the routing along with the valid http methods for each route.
Once the server is started you can make requests using the Client app or any other app like a browser or Postman.

The Client

The client app is command line interactive. It references the server directly, this is set in the variable "server", so no need to type localhost and port all the time, but the route, method and body of each request are entered on the CL. I used the node readline function for the prompts. This is handled in the 'readIn' function. The function then calls the 'fetch_data' func with the entered parameters (as options).  It's the fetch_data func that actually makes the request, by using node_fetch, and logs the response to the console. Afterwards it restarts the process by calling readIn back.

For POST and PUT requests, the body must be styled in JSON standard, else it will get an invalid json syntax error. This is because the server uses body-parser for validating request objects.

