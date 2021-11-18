// Load the AWS SDK for Node.js
const { REGION } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Using the DynamoDB Document Client

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const deleteArr = [
  { Shop: 'Amazon', DateTime: 202111111630 },
  { Shop: '楽天', DateTime: 202111122322 }
];

const requestArr = [];
deleteArr.forEach(obj => {
  const requestObj = {
    DeleteRequest: {
      Key: obj
    }
  };
  requestArr.push(requestObj);
});

const params = {
  RequestItems: {
    codeReviewTestTable: requestArr
  }
};

docClient.batchWrite(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
