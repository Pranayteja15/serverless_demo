import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const AWS= require("aws-sdk");
import schema from './schema';


const deleteTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const{ Id }=event.pathParameters;
  const dynamoDB=new AWS.DynamoDB.DocumentClient();
try {
  await dynamoDB.delete({
    TableName:"pranay-demo-table",
    Key:{Id}
  }).promise();
  
} catch (error) {
  return formatJSONResponse({
    message: `Error Deleting Todo`
  });
}

return formatJSONResponse({
  message: "Todo Deleted Successfully"
});
   
};


export const main = middyfy(deleteTodo);
