import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const TABLE_NAME = process.env.TABLE_NAME;
let docClient;
try {
    const client = new DynamoDBClient({
        region: process.env.AWS_REGION_NAME,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    docClient = DynamoDBDocumentClient.from(client);
    console.log("Successfully connedted to the database...");
    
} catch (error) {
    console.error("Error initializing DynamoDB client: ", error);
    throw new Error("Failed to initialize DynamoDB client");
}

export { TABLE_NAME, docClient };
