import * as userModel from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const checkUsername = async (req, res, next) => {
    try {
        const {username} = req.params;
        
        if("0123456789".indexOf(username.charAt(0)) !== -1){
            return res.json({ message: "Username must not start with a number"})
        }
        if (username.length < 3) {
            return res.json({ message: "Too Short" });
        }
        const response = await userModel.getUserInfoByUsername(`${username}`);
        
        if (response) {
            return res.json({ available: false });
        } else {
            return res.json({ available: true });
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
            return res.status(400).json({ error: "User Data not found" });
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

export const updateUser = async(req,res) => {
    try {
        const {name,bio,avatarUrl,coverUrl} = req.body;
        const {username} = req.params;
        const updateData = {};
        if(name) updateData.name = name;
        if(bio) updateData.bio = bio;
        if(avatarUrl) updateData.avatarUrl = avatarUrl;
        if(coverUrl) updateData.coverUrl = coverUrl;
        
        if (!updateData || Object.keys(updateData).length === 0) {
            throw new ApiError(400,"User update data not found");
        }
        
        const updatedUser = await userModel.updateUserInDB(username,updateData);
        
        if(!updatedUser){
            throw new ApiError(501,"udpated user data not found after saving data to DB");
        }
    
        return res.status(201).json(new ApiResponse("User details updated successfully",201,updatedUser));
    } catch (error) {
        console.log("Error :",error);
        throw new ApiError(501,"something went wrong while updating user details in user controllers");
    }
}
