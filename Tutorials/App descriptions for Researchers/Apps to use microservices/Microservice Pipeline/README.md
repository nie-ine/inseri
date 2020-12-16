# Microservice Pipeline

This tutorial lists the steps needed to set up an inseri microservice pipeline. It describes how to set up an inseri page which will perform the following tasks: 

1. Send a request to an API
1. Catch the response
1. Use a Python script to transform the response into a different structure
1. Pass the new data structure into another inseri app

## Setting Up the Pipeline

### Prerequisites

To set up the pipeline, you should have an according API call and Python file ready to send a request and transform its response respectively. 

### Steps to Perform

1. Create a new inseri page
1. Open the _MyFiles_ app
1. Add your Python file
1. Click on the newly added file
1. Select _Python Environment_
1. Select _pythonFile_ and a new _Python Environment_ with your selected Python code is added to the page
1. Open _Data Management_
1. Create your request by creating a new query
1. Assign the query to the page's _Python Environment_ (it might be called jsonEnvironment inside _Data Management_) by clicking on _assignedJson_
1. Map the response to the needed key by clicking on _map_
1. Close _Data Management_ - the needed part of the query response shows up in the _Python Environment_
1. Make sure your Python scripts works correctly by adhering to the following principles: 
   
   - Import the json package
     ```python
     import json
     ```
   - The script has to read the response as a file. Make sure the script reads a file called **yourData.json** to read in the contents of the query response, e.g.:
     ```python
     with open("yourData.json") as json_file:
         data = json.load(json_file)
     ```
   - Return your output by printing it to the "console", e.g.:
     ```python
     import json
     
     # A function to read the response and transform it
     def example_function(inpt):
         # Read the JSON response and parse it to a Python dictionary
         with open(inpt) as json_file:
             response = json.load(json_file)
     
         # Do your transformation and create an output
        
         # Return the output as JSON
         return json.dumps(output)
     
     if __name__ == "__main__":
         # Print the output of the function to the "console"
         print(example_function("yourData.json"))
     ```
   The Python script should now be executed correctly, and the output shown in the _Python Environment_ should be the one needed as the input for the other inseri app
1. Edit the _Python Environment_'s description to see the apps unique hash
1. Copy the hash
1. Open _Data Management_ and create a new GET query
1. Use the previously copied hash as the server URL of the query - the query's response is now the _Python Environment_'s output
1. Close _Data Management_ 
1. Open the needed inseri app to use the _Python Environment_'s output as its input
1. Open _Data Management_
1. Assign the previously created query (the one querying the _Python Environment_ output) to the app
1. Map the key "output" of the query to the app
