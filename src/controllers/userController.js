import * as userModel from "../models/userModel.js";

export const checkUsername = async (req, res, next) => {
    try {
        if (req.params.username.length < 3) {
            res.json({ message: "Too Short" });
        }
        const response = await userModel.getUserInfoByUsername(
            `${req.params.username}`
        );
        if (response) {
            res.json({ available: false });
        } else {
            res.json({ available: true });
        }
    } catch (error) {
        next(error);
    }
};

export const getUserInfo = async (req, res, next) => {
    try {
        const response = await userModel.getUserInfoByUid(`${req.params.uid}`);
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        next(error);
    }
};

export const getUserData = async (req, res) => {    
    try {
        const response = await userModel.getUserData(`${req.params.username}`);
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        //Basic Validation
        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ error: "Data not found" });
        }

        //we can further check that if the required fields are present or not:
        //I am skipping it for now because I will implement it later

        // // Add timestamp to the user data
        // userData.createdAt = new Date().toISOString();

        //calling the function to create a new user
        await userModel.createUser(userData);

        //send a success response
        res.status(201).json({
            message: "User created successfully",
            user: userData,
        });
    } catch (error) {
        console.error("Error in userController.js: ", error);

        //send an error response
        res.status(500).json({
            error: "An error occurred while creating the user",
            details: error.message,
        });
    }
};
