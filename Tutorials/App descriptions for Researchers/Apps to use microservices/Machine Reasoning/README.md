# Machine Reasoning 

The machine reasoning app lets you communicate with the [machine reasoning microservice](https://github.com/nie-ine/microservice-reasoning-task) to conduct a reasoning session. 

The microservice is an Ubuntu 18.04 Docker container with the [EYE reasoner](http://sourceforge.net/projects/eulersharp/files/eulersharp/) (v20.0323.1552) and its dependencies (carl-1.0.3 and cturtle-1.0.6) installed as well as a Python Flask app to handle the requests to the service. 

In the app, you can select data, rule, and query files (allowed are .ttl, .n3, .nt) from your local computer and POST their contents to the microservice. The service returns a downloadable turtle file with the results of the reasoning session displayed within the app.
In addition to or instead of local files, you can indicate file URLs of publicly available data, rule, or query files. 

Currently, each reasoning session is conducted with the --nope parameter and you cannot change this. 

![Machine reasoning app](images/machine-reasoning-app.png)

## Conduct a Reasoning Session 

1. Select data files or indicate data file URLs
2. Select rule files or indicate rule file URLs
3. Select query files or indicate query file URLs
4. Click on button "Reason"
5. Wait for reasoning results to be displayed in the right panel
