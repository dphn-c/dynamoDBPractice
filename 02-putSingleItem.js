// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
const data = require('./data.json');
// Set the region
config.update({ region: REGION });

// Create the DynamoDB service object

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

/* Using DynamoDB function directly

const ddb = new DynamoDB({ apiVersion: '2012-08-10' });

const params = {
  TableName: DYNAMODB_NAME,
  Item: {
    Shop: { S: data[0].Shop },
    DateTime: { N: data[0].DateTime },
    Cost: { N: data[0].Cost },
    Details: { L: [
      M: {
        価格 : { N: data[0]['Details'][0]['品名']}
        ...
        ...
        ...
      },
      M: {
        ...
        ...
        ...
      }
    ]},
    Category: { S: data[0].Category },
    TaxCut: { S: data[0].TaxCut }
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});

*/

// Using the DynamoDB Document Client

const params = {
  TableName: DYNAMODB_NAME,
  Item: {
    Shop: data[0].Shop,
    DateTime: data[0].DateTime,
    Cost: data[0].Cost,
    Details: data[0].Details,
    Category: data[0].Category,
    TaxCut: data[0].TaxCut
  }
};
docClient.put(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
