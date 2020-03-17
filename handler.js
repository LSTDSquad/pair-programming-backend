'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4')


module.exports.setData =(event, context, callback) => {

	//set data for new entry in the dynamoDB table

	const data = JSON.parse(event.body);
	const id = uuid.v4();
	const params = {
    		TableName: process.env.DATA_TABLE,
    		Item: {
    			id: id,
    			text: data.text}
    		}
	const headers = {
      		"Access-Control-Allow-Origin": "*",
     		"Access-Control-Allow-Credentials": true};

	dynamoDb.put(params, (error, data) => {
	 	
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
};

module.exports.getData = (event, context, callback) => {

	//load data from exisitng entry in the dynamoDB table by sessionID

  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  const headers = {
      		"Access-Control-Allow-Origin": "*",
     		"Access-Control-Allow-Credentials": true};

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(result.Item.text),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch text.'));
      return;
    });
};

module.exports.updateData = (event, context, callback) => {

	//update data in exisitng entry in the dynamoDB table by sessionID

	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.DATA_TABLE,
		Key: {
			id: event.pathParameters.id,
		},
		UpdateExpression: 'SET #text =:text',
                ExpressionAttributeNames: {
                    '#text': 'text' //COLUMN NAME       
                },
                ExpressionAttributeValues: {
                    ':text': data.text
                }
	};
	
	const headers = {
      		"Access-Control-Allow-Origin": "*",
     		"Access-Control-Allow-Credentials": true};

     dynamoDb.update(params).promise()
	    .then(result => {
	      const response = {
	        statusCode: 200,
	        headers: headers,
	        body: JSON.stringify(params.Item),
	      };
	      callback(null, response);
	    })
	    .catch(error => {
	      console.error(error);
	      callback(new Error('Couldn\'t update text.'));
	      return;
	    });
};

