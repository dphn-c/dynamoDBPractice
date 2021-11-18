// Load the AWS SDK for Node.js
const { REGION, DYNAMODB_NAME } = process.env;
const { config, DynamoDB } = require('aws-sdk');
// Set the region
config.update({ region: REGION });

// Create the DynamoDB service object
const ddb = new DynamoDB({ apiVersion: '2012-08-10' });

/*
const params0 = {
  AttributeDefinitions: [
    {
      AttributeName: 'UserID',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'UserID',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: DYNAMODB_NAME,
  StreamSpecification: {
    StreamEnabled: false
  }
};
*/

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'Shop',
      AttributeType: 'S'
    },
    {
      AttributeName: 'DateTime',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'Shop',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'DateTime',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: DYNAMODB_NAME,
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Table Created', data);
  }
});
