## Weather Api

* Get an api key from https://developer.worldweatheronline.com/api/ and add this key in the function at index.js

## Dialogflow
* Enable Small Talk
* Use Version 1 not 2
### Intents
* We would have two intents
	* Basic intent called **weather** in which we would have 2 entities
		* City (required)
		* Date (optional) since we would assume it is today if the user did not specify
	* context intent called **weather.context** which could only be triggered after the first one is triggered
		* The benifit of this is that the user could ask about the weather for the same location at another date 
* We need to enable webhook for both intents
* Both intents use the same function in the backend

### Entities
* No custom entites are needed Entities needed such as date and city are provided by Dialogflow


## AWS Lambda
* Create a lambda function that has a role of **LambdaFullAccess**. Create one from template if it does not already exist
* Create lambda command: 
	* `aws lambda create-function --region us-east-1 --function-name weather --profile default --runtime nodejs6.10 --role arn:aws:iam::791347282543:role/LambdaFullAccess --handler index.handler --zip-file fileb://src/src.zip`
* To invoke function:
	* `aws lambda invoke --invocation-type Event --function-name weather --region us-east-1 --payload file://test_event.json --profile default outputFile.txt`
* To update function code: 
	* Zip the files inside the src directory
	* `aws lambda update-function-code --zip-file fileb://src/src.zip --function-name weather`
* Make sure you deplyed the api
* Make sure lambda proxy is disabled
* Add environment variable in lambda config
* Add this url to the fullfillment in dialogflow

TODO
* Credentials for lambda access