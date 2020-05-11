'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4')

module.exports.getSessions = (event, context, callback) => {

  //load data from exisitng entry in the dynamoDB table by sessionID

  const params = {
    TableName: process.env.USER_TABLE,
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
        body: JSON.stringify(result.Item.sessions),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch sessions.'));
      return;
    });
};

module.exports.getChildren = (event, context, callback) => {

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
        body: JSON.stringify(result.Item.children),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch session info.'));
      return;
    });
};

module.exports.getLastEdit = (event, context, callback) => {

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
        body: JSON.stringify(result.Item.lastEdit),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch latest edit.'));
      return;
    });
};