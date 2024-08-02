import * as userModel from '../models/userModel.js'

export const getUser = async (req, res, next) => {
    try{
        const user = await userModel.getUser(`${req.params.username}`);
        if(user){
            res.json(user);
        }else{
            res.status(404).json({error: "Could not find user with provided username"});
        }
    }catch (error){
        next(error);
    }
};