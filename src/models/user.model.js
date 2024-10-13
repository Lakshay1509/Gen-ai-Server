import mongoose, {Schema} from "mongoose";


import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    moods: {
        type: [Number],
        default: [0, 0, 0, 0], // This indicates an array of numbers
        validate: {
          validator: function(array) {
            // Custom validation to ensure all elements are integers
            return array.every(Number.isInteger);
          },
          message: 'Each mood entry must be an integer.',
        },
      },
    moodWeek : {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0],
        validate: {
          validator: function(array) {
            return array.every(Number.isInteger);
          },
          message: 'Each mood entry must be an integer.',
        },
      },

},{timestamps:true})

userSchema.pre("save",async function (next) {

    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password,8)
        next()
    
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}


export const User = mongoose.model('User',userSchema);
