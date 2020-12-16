# Microservice Pipeline

This tutorial lists the steps to set up an inseri microservice pipeline on a new page which will perform the following tasks: 

1. Send a request to an API
1. Catch the response
1. Use a Python script to transform the response into a different structure
1. Pass the new data structure into another inseri app

## Setting Up the Pipeline

### Prerequisites

To set up the pipeline, you should have an according API call and Python file ready to send a request and transform its response, respectively. 

### Steps to Perform

1. Create a new inseri page
1. Open the _MyFiles_ app
1. Add your Python file
1. Click on the newly added file
1. Select _Python Environment_
1. Select _pythonFile_ - a new _Python Environment_ with your selected Python code is added to the page
1. Open _Data Management_
1. Create your API request by creating a new query
1. Click on _assignedJson_ to assign the query to the page's _Python Environment_ (it might be called jsonEnvironment in the _Data Management_)
1. Click on _map_ to map the response to the appropriate key
1. Close _Data Management_ - the appropriate part of the query response shows up in the _Python Environment_
1. Adhere to the following principles to make sure your Python scripts works correctly: 
   
   - Import the json package
     ```python
     import json
     ```
   - Treat the query response as a file called **yourData.json**, e.g.:
     ```python
     import json
     
     with open("yourData.json") as json_file:
         response = json.load(json_file)
     ```
   - Look for the query response inside the "json" key, e.g.:
     ```python
     import json
     
     with open("yourData.json") as json_file:
         response = json.load(json_file)
     
     data = response["json"]
     ```
   - Return your output by printing it to the "console", e.g.:
     ```python
     import json
     
     # A function to read the response and transform it
     def example_function(inpt):
         # Read the JSON response and parse it to a Python dictionary
         with open(inpt) as json_file:
             response = json.load(json_file)
         
         data = response["json"]
         
         # Do your transformation and create the desired output
         
         # Return the output as JSON
         return json.dumps(output)
     
     if __name__ == "__main__":
         # Print the return statement of the function to the "console"
         print(example_function("yourData.json"))
     ```
   The Python script should now be executed correctly, and the according output is shown in the _Python Environment_
1. Edit the _Python Environment_'s description to see the app's unique hash
1. Copy the hash
1. Open _Data Management_ and create a new GET query
1. Use the copied hash as the server URL of the query to get the _Python Environment_'s output
1. Close _Data Management_ 
1. Open the inseri app which uses your _Python Environment_'s output as its input
1. Open _Data Management_
1. Assign the previously created query (the one querying the _Python Environment_'s output) to the app
1. Map the "output" key of the query to the app
