// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Using the DynamoDB Document Client

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

// HASH key can only be query with '=' operator

// Query with HASH key alone
const params = {
  TableName: DYNAMODB_NAME,
  ExpressionAttributeValues: { ':name': '楽天' },
  KeyConditionExpression: 'Shop < :name'
};

// Query with both HASH key and RANGE key
const params2 = {
  TableName: DYNAMODB_NAME,
  ExpressionAttributeNames: { '#dt': 'DateTime' }, // If the key name is reserved words in DynamoDB, such as 'year', 'name', 'system', the expression have to be set here.
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
  ExpressionAttributeValues: { ':name': '楽天', ':st': 202111110000, ':ed': 202111122359 },
  KeyConditionExpression: 'Shop = :name AND #dt BETWEEN :st AND :ed'
};

// Create a secondary index if you want to query with other attributes.
const params3 = {
  TableName: DYNAMODB_NAME,
  IndexName: 'CategoryCostIndex',
  ExpressionAttributeValues: { ':cat': '食費', ':price': 15000 },
  KeyConditionExpression: 'Category = :cat AND Cost <= :price'
};

// Make use of 'FilterExpression'
const params4 = {
  TableName: DYNAMODB_NAME,
  IndexName: 'CategoryCostIndex',
  ExpressionAttributeValues: { ':cat': '食費', ':price': 15000, ':shop': 'Amazon' },
  KeyConditionExpression: 'Category = :cat AND Cost <= :price',
  FilterExpression: 'Shop = :shop'
};

docClient.query(params3, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.Items);
  }
});
