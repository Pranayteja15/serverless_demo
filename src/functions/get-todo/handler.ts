import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const AWS= require("aws-sdk");
import schema from './schema';

const getTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const {date}=event.pathParameters;
  const dynamoDB=new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: 'pranay-demo-table',
    IndexName: 'date-index',
    KeyConditionExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': date },
    ExpressionAttributeNames: { '#name': 'date' }
  }

  try{

    
    const results=await dynamoDB.query(params).promise();
  
    
    return formatJSONResponse({
      Todos: results.Items
    });
  }
  catch(error){
    return formatJSONResponse({
      message: "Cannot process request",
      error
    });
  }
 

  
};


export const main = middyfy(getTodo);
