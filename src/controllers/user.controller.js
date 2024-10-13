import {asyncHandler} from "../utils/asyncHandler.js"
import  {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/APiResponse.js"

import {User} from "../models/user.model.js"

import mongoose from "mongoose"


const registerUser = asyncHandler(async(req,res)=>{

    console.log(req.body)

    const { fullname, email, username, password ,moods,moodWeek} = req.body
    console.log(fullname , email , username , password)

    if (
        [fullname, email, username, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "Please fill in all fields")

    }

    const existedUser = await User.findOne({
        $or : [{email},{username}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exist")
    }

    const user = await User.create({
        fullname,
        email,
        username,
        password,
        moods,
        moodWeek,

    })
    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Error creating user")
    }


    return res.status(201).json(new ApiResponse(200, "User created successfully", createdUser))

})
const loginUser = asyncHandler(async (req, res) => {


    //req body
    //username or email
    //find the user
    //checkk for password
    //access and refersh token
    //send cookies
    //send response

    const { email, username, password } = req.body


    if (!username && !email) {
        throw new ApiError(400, "Please provide username or email")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPassword = await user.isPasswordCorrect(password)

    if (!isPassword) {
        throw new ApiError(401, "Invalid credentials")
    }

    

    const loggedInUser = await User.findById(user._id).select("-password -refereshToken")


    const options = {
        httpOnly: true,
        secure: true

    }

    return res.status(200).json(new ApiResponse(200, {
        user: loggedInUser
    },
        "User logged in successfully"
    ))


})

const getMood = asyncHandler(async(req,res)=>{

    const {id} = req.query
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(id) 

    if(!user){
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(new ApiResponse(200, user.moods, "Mood retrieved successfully"))
})

const updateMood = asyncHandler(async(req,res)=>{

    const {id} = req.query
    const {mood} = req.body

   

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(id) 

    if(!user){
        throw new ApiError(404, "User not found")
    }

    let arr = user.moods

    for(let i = 0; i < mood.length; i++){
        arr[i] += mood[i]
    }

    user.moods = arr

    await user.save()

    return res.status(200).json(new ApiResponse(200, user.moods, "Mood updated successfully"))
})

const getWeekly = asyncHandler(async(req,res)=>{
    const {id} = req.query

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(id)
    if(!user){
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(new ApiResponse(200, user.moodWeek, "Mood retrieved successfully"))

})

const updateMoodWeek = asyncHandler(async(req,res)=>{
    const {id} = req.query
    const {mood} = req.body
   

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(id)
    if(!user){
        throw new ApiError(404, "User not found")
    }

    let arr = user.moodWeek
    

    let score = 0;
    for(let i =0; i< mood.length; i++){
        if(i==0){
            score += 3*mood[i];
        }
        else{
            score -= mood[i];
        }
    }

    const d = new Date();
    let idx = d.getDay();
    

    arr[idx] += score;
    user.moodWeek = arr;

    await user.save();

    return res.status(200).json(new ApiResponse(200, user.moodWeek, "Mood updated successfully"))

})

export {registerUser,loginUser,getMood,updateMood,updateMoodWeek,getWeekly}