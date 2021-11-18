// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Using the DynamoDB Document Client

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

// SET and REMOVE ACTION
const params = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: 'Amazon', DateTime: 202111111630 },
  ExpressionAttributeNames: {
    '#co': 'Cost',
    '#de': 'Details',
    '#p': '価格',
    '#cat': 'Category',
    '#ven': 'Venders',
    '#pay': 'PaymentMethod',
    '#tax': 'TaxCut'
  },
  ExpressionAttributeValues: {
    ':nco': 9345,
    ':nsprice': 5000,
    ':addprice': 500,
    ':ncat': '食材',
    ':nv': ['うまいシーフードショップ'],
    ':np': 'Credit Card'
  },
  UpdateExpression:
    'SET #co = :nco, #de[1].#p = :nsprice, #de[0].#p = #de[0].#p + :addprice, #cat = :ncat, #ven = list_append(#ven, :nv), #pay = :np REMOVE #tax'
};

// ADD ACTION with NUMBER type
const params2 = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: '楽天', DateTime: 202111122322 },
  ExpressionAttributeNames: {
    '#co': 'Cost',
    '#de': 'Details',
    '#p': '価格'
  },
  ExpressionAttributeValues: {
    ':add': 500
  },
  UpdateExpression: 'ADD #co :add, #de.#p :add'
};

// ADD ACTION with SET type
const params3 = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: '楽天', DateTime: 202111122322 },
  ExpressionAttributeNames: {
    '#ven': 'Venders'
  },
  ExpressionAttributeValues: {
    ':addVenders': docClient.createSet(['a1', 'b2'])
  },
  UpdateExpression: 'ADD #ven :addVenders'
};

/*
// SET type in DynamoDB is different from set in Javascript
const addSet = new Set(['c3', 'd4']);
const params4 = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: '楽天', DateTime: 202111122322 },
  ExpressionAttributeNames: {
    '#ven': 'Venders'
  },
  ExpressionAttributeValues: {
    ':addVenders': addSet
  },
  UpdateExpression: 'ADD #ven :addVenders'
};

// Error ValidationException: ExpressionAttributeValues contains invalid value: Supplied AttributeValue is empty, must contain exactly one of the supported datatypes for key :addVenders

*/

const params4 = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: '楽天', DateTime: 202111122322 },
  ExpressionAttributeNames: {
    '#ven': 'Venders'
  },
  ExpressionAttributeValues: {
    ':addVenders': docClient.createSet(['c3', 'd4'])
  },
  UpdateExpression: 'ADD #ven :addVenders'
};

// DELETE ACTION -> Can only be use with SET type

const params5 = {
  TableName: DYNAMODB_NAME,
  Key: { Shop: '楽天', DateTime: 202111122322 },
  ExpressionAttributeNames: {
    '#ven': 'Venders'
  },
  ExpressionAttributeValues: {
    ':addVenders': docClient.createSet(['b2', 'd4'])
  },
  UpdateExpression: 'DELETE #ven :addVenders'
};

docClient.update(params5, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});

// Difference between of PUT and UPDATE
// Origin data should be deleted for the change? -> PUT
// Only specific attributes should be change while the others should be kept? -> UPDATE
