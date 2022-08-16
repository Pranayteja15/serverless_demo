import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "node_modules/uuid";
import schema from './schema';
const AWS= require("aws-sdk");

const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const{ todo, date}=event.body;
  const id =v4()
  const todoTask={
      id,todo,date
  }; 
  const dynamoDB=new AWS.DynamoDB.DocumentClient();
try {
  await dynamoDB.put({
    TableName:"pranay-demo-table",
    Item:todoTask
  }).promise();
} catch (error) {
  return formatJSONResponse({
    message: `Error Creating Todo ${error}`
  });
}
   
  
  return formatJSONResponse({
    message: `Todo Added`
  });
};
  

export const main = middyfy(createTodo);
