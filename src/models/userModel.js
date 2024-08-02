import { docClient, TABLE_NAME } from "../../config/dynamodb.js";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getUser = async (username) => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            username: username,
            SK: 'PROFILE'
        },
    });

    const response = await docClient.send(command);
    return response.Item;
};