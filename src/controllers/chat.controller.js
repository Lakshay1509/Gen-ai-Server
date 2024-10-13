import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/APiResponse.js"

import { User } from "../models/user.model.js"

import mongoose from "mongoose"


const saveMessage = asyncHandler(async (req, res) => {


    const {id,message}  = req.body

    


}
)