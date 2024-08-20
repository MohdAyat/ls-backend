import serverless from 'serverless-http'
import app from './src/index.js';

const handler = serverless(app);

export const main = async (event, context) => {
    try{
        const result = await handler(event, context);
        return result;
    }catch (error){
        console.error(error);
        return{
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error"}),
        };
    }
};