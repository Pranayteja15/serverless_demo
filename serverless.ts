import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import createTodo from '@functions/create-todo';
import deleteTodo from '@functions/delete-todo';
import updateTodo from '@functions/update-todo';
import getTodo from '@functions/get-todo';

const serverlessConfiguration: AWS = {
  service: 'serverless-pranay-demo',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements:[
      {
        Effect:"Allow",
        Action:[
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource:[
          "arn:aws:dynamodb:us-east-1:877969058937:table/pranay-demo-table","arn:aws:dynamodb:us-east-1:877969058937:table/pranay-demo-table/index/*"
         

        ]
      }
    ]
  },

  // import the function via paths

  
  functions: { hello,createTodo,deleteTodo,updateTodo,getTodo},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },

  resources:{
    Resources:{
      ListTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        
        Properties: {
            TableName: "pranay-demo-table",
            BillingMode:"PAY_PER_REQUEST",
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType:"S" }
            ],
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" }
            ]
            
        }
      }      
}
  }
};

module.exports = serverlessConfiguration;
