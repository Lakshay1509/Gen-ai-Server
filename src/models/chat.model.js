import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    userId: {
        type: "string",
        required: true,
    },
    messages: [{
        sender: {
            type: String, 
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        
    }],
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
