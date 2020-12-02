# Machine Reasoning 

The machine reasoning app lets you communicate with the [machine reasoning microservice](https://github.com/nie-ine/microservice-reasoning-task) to conduct a reasoning session. 

The microservice is an Ubuntu Docker container with the [EYE reasoner](http://sourceforge.net/projects/eulersharp/files/eulersharp/) and its dependencies installed and a Python Flask app to handle the requests to the service. 

In the app, you can select data, rules, and query files (allowed are .ttl, .n3, .nt) from your local computer and POST their contents to the microservice. The service returns a downloadable turtle file with the results of the reasoning session displayed within the app.
In addition or alternatively to locally stored files, you can indicate file URLs of data, rules, or queries. 

Currently, each reasoning session is conducted with the --nope parameter only and you can not change this. 

![Machine reasoning app](images/machine-reasoning-app.png)
