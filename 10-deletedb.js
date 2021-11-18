// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Create the DynamoDB service object

const ddb = new DynamoDB({ apiVersion: '2012-08-10' });

var params = {
  TableName: DYNAMODB_NAME
};

// Call DynamoDB to add the item to the table
ddb.deleteTable(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
