// Load the AWS SDK for Node.js
const { REGION } = process.env;
const { config, DynamoDB } = require('aws-sdk');
const data = require('./data.json');
// Set the region
config.update({ region: REGION });

// Create the DynamoDB service object

/* Using DynamoDB function directly

const ddb = new DynamoDB({ apiVersion: '2012-08-10' });

const params = {
  RequestItems: {
    'codeReview-test-table': [
      {
        PutRequest: {
          Item: {
            Shop: { S: '楽天' },
            DateTime: { N: '202111122322' },
            Cost: { N: '80000' },
            Details: {
              M: {
                品名: { S: 'iPad Air' },
                価格: { N: '80000' },
                ブランド: { S: 'Apple' },
                容量: { S: '256GB' },
                カラー: { S: 'ブルー' }
              }
            },
            Category: { S: '電気機器' },
            TaxCut: { S: '事業経費' }
          }
        }
      },
      {
        PutRequest: {
          Item: {
            Shop: { S: '楽天' },
            DateTime: { N: '202111131516' },
            Cost: { N: '10000' },
            Details: {
              M: { 品名: { S: 'ホタテ' }, 価格: { N: '10000' }, 重量: { S: '1kg' } }
            },
            Category: { S: '食費' }
          }
        }
      }
    ]
  }
};

// Call DynamoDB to add the item to the table
ddb.batchWriteItem(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});

*/

// Using the DynamoDB Document Client

const docClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

// data.shift();

const requestArr = [];

data.forEach(obj => {
  const requestObj = {
    PutRequest: {
      Item: obj
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
