import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {saveExternalLink,removeExternalLink} from "../models/externalLinkModel.js";
import { v4 as uuidv4} from "uuid";


export const createExternalLink = async(req,res) => {
  try {
    const linkData = req.body
    if (!linkData || Object.keys(linkData).length === 0) {
      throw new ApiError(400,"Link data not found");
    }

    const now = new Date().toISOString();
    const linkId = uuidv4();
    const data = {
      linkID: linkId,
      SK: `PROFILELINK${linkId}`,
      createdAt: now,
      updatedAt: now,
      ...linkData
    }

    await saveExternalLink(data);
    return res.status(201).json(new ApiResponse("External link saved successfully",201,data));
  } catch (error) {
    throw new ApiError(500,"Error while saving link data to database in externalLinkController.js",error.message);
  }
}


export const deleteExternalLink = async(req,res) => {
  try {
    const {username} = req.body;
    const { linkID } = req.params;
    if (!linkID) {
      throw new ApiError(400, "LinkID not provided");
    }
    if(!username){
      throw new ApiError(400,"username is missing");
    }

    await removeExternalLink(linkID,username); 
    return res.status(200).json(new ApiResponse("External link deleted successfully", 200));
  } catch (error) {
    console.log("Error: ",error);
    throw new ApiError(501,"something went wrong while fetching the link by ID");
  }
}

