import { docClient,TABLE_NAME } from "../../config/dynamodb.js";
import { PutCommand,GetCommand,QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ApiError } from "../utils/ApiError.js";

export const saveExternalLink = async(data) => {
  
  const command = {
    TableName: TABLE_NAME,
    Item: data
  };
  try {
    await docClient.send(new PutCommand(command));
  } catch (error) {
    throw new ApiError(500,"Error while saving link to db",error.message)
  }
}
