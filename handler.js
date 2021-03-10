'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4')


module.exports.setData = (event, context, callback) => {

  //set data for new entry in the dynamoDB table

  const data = JSON.parse(event.body);
  const id = uuid.v4();
  const params = {
    TableName: process.env.DATA_TABLE,
    Item: {
      id: id,
      text: data.text
    }
  }
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  console.log(data);

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
    "Access-Control-Allow-Credentials": true
  };

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
    "Access-Control-Allow-Credentials": true
  };

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

module.exports.updateLastEdit = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'SET #lastEdit =:lastEdit',
    ExpressionAttributeNames: {
      '#lastEdit': 'lastEdit' //COLUMN NAME       
    },
    ExpressionAttributeValues: {
      ':lastEdit': data.timestamp
    }
  };


  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

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
      callback(new Error('Couldn\'t update timestamp.'));
      return;
    });
};

module.exports.updateName = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'SET #name =:name',
    ExpressionAttributeNames: {
      '#name': 'name' //COLUMN NAME       
    },
    ExpressionAttributeValues: {
      ':name': data.name
    }
  };


  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

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
      callback(new Error('Couldn\'t update name.'));
      return;
    });
};

module.exports.getName = (event, context, callback) => {

  //load data from exisitng entry in the dynamoDB table by sessionID

  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(result.Item.name),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch name.'));
      return;
    });
};



module.exports.updateRunCount = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#runCount': 'runCount' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':inc': 1, ':start': 0 },
    UpdateExpression: "SET #runCount = if_not_exists(#runCount, :start) + :inc"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update runCount.'));
      return;
    });
};

module.exports.updateConfusionCount = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#confusionCount': 'confusionCount' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':inc': 1, ':start': 0 },
    UpdateExpression: "SET #confusionCount = if_not_exists(#confusionCount, :start) + :inc"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update confusionCount.'));
      return;
    });
};

module.exports.updateToggleCount = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#toggleCount': 'toggleCount' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':inc': 1, ':start': 0 },
    UpdateExpression: "SET #toggleCount = if_not_exists(#toggleCount, :start) + :inc"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update toggleCount.'));
      return;
    });
};

module.exports.updateCommentCount = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#commentCount': 'commentCount' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':inc': 1, ':start': 0 },
    UpdateExpression: "SET #commentCount = if_not_exists(#commentCount, :start) + :inc"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update commentCount.'));
      return;
    });
};

module.exports.updateTimeStamps = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  //test comment
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#timestamps': 'timestamps' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':timestamp': [data], ':start': [] },
    UpdateExpression: "SET #timestamps = list_append(if_not_exists(#timestamps, :start), :timestamp)"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update timestamps.'));
      return;
    });
};

module.exports.updateChat = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  //test comment
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#chat': 'chat' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':message': [data], ':start': [] },
    UpdateExpression: "SET #chat = list_append(if_not_exists(#chat, :start), :message)"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update chat.'));
      return;
    });
};

module.exports.updateSessionLength = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  //test comment
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#sessionLength': 'sessionLength' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':session': [data], ':start': [] },
    UpdateExpression: "SET #sessionLength = list_append(if_not_exists(#sessionLength, :start), :session)"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update session length.'));
      return;
    });
};

module.exports.updateChildren = (event, context, callback) => {

  //update data in exisitng entry in the dynamoDB table by sessionID
  //test comment
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: { '#children': 'children' }, //COLUMN NAME 
    ExpressionAttributeValues: { ':child': dynamoDb.createSet([data.child]) },
    UpdateExpression: "ADD #children :child"
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
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t update children.'));
      return;
    });
};

