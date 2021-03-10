'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4')

module.exports.updateSessions = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  //test comment
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#sessions': 'sessions' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':session': {
      'SS': [data.session]
    }},
    UpdateExpression: "ADD #sessions :session"
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  dynamoDb.update(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      callback({message: 'unable to update session.', event});
      return;
    });
};