import { docClient, TABLE_NAME } from "../../config/dynamodb.js";
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const createUser = async (data) => {
    const command = {
        TableName: TABLE_NAME,
        Item: data,
    };

    try {
        await docClient.send(new PutCommand(command));
    } catch (error) {
        if (error.name === "ClientError") {
            console.error(`An error occurred: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};

export const getUserInfoByUsername = async (username) => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            username: username,
            SK: "PROFILE",
        },
    });
    const response = await docClient.send(command);
    return response.Item;
};

export const getUserInfoByUid = async (uid) => {
    try {
        const command = new QueryCommand({
            TableName: TABLE_NAME,
            IndexName: "uid-index",
            KeyConditionExpression: "uid = :uid AND SK = :sk",
            ExpressionAttributeValues: {
                ":uid": uid,
                ":sk": "PROFILE",
            },
        });

        const response = await docClient.send(command);
        return response.Items[0];
    } catch (error) {
        console.error("Error queryin user information: ", error);
        throw new Error(error);
    }
};

export const getUserData = async (username) => {
    const command = {
        TableName: TABLE_NAME,
        KeyConditionExpression:
            "#username = :username AND begins_with(#SK, :profile)",
        ExpressionAttributeNames: {
            "#username": "username",
            "#SK": "SK",
        },
        ExpressionAttributeValues: {
            ":username": username,
            ":profile": "PROFILE",
        },
    };

    try {
        const response = await docClient.send(new QueryCommand(command));
        if(response.Count === 0){
            return null;
        }
        return response.Items
    } catch (error) {
        if (error.name === "ClientError") {
            console.error(`An error occurred: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
        return null; // handle the error at frontend if return type is None
    }
};