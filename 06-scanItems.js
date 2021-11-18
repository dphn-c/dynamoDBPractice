// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Using the DynamoDB Document Client

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

var params = {
  TableName: DYNAMODB_NAME
};

// Call DynamoDB to add the item to the table
docClient.scan(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
