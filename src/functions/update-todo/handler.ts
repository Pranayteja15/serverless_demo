import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const AWS= require("aws-sdk");
const dynamoDB=new AWS.DynamoDB.DocumentClient();
import schema from './schema';

const updateTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const{ Id,todo }=event.body;
  
try {
  const results=await dynamoDB.update({
    TableName:"pranay-demo-table",
    Key:{Id},
    UpdateExpression:`set todo=:todo`,
    ExpressionAttributeValues:{
          ':todo':todo
    },
    ReturnValues:"ALL_NEW"
  }).promise();

  return formatJSONResponse({
    message: results
  });
  
} catch (error) {
  return formatJSONResponse({
    message: `Error Creating Todo`
  });
}
   
};


export const main = middyfy(updateTodo);
