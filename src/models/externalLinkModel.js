import { docClient,TABLE_NAME } from "../../config/dynamodb.js";
import { PutCommand,GetCommand,QueryCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb";
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

export const removeExternalLink = async(linkID,username) => {
  const command = {
    TableName: TABLE_NAME,
    Key: {
      username: username,
      "SK": `PROFILELINK${linkID}`
    }
  };

  try {
    await docClient.send(new DeleteCommand(command));
  } catch (error) {
    console.log("Error : ",error);
    
    throw new ApiError(500, "Error while deleting link from DB", error.message);
  }
};