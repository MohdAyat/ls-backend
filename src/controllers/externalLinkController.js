import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {getExternalLinkByID ,saveExternalLink} from "../models/externalLinkModel.js";
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
      SK: "PROFILELINK",
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
