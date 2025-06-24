import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";

export const getUserForSidebar = async (req,res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");
        res.status(200).json(filteredUsers); 
    } catch (error) {
        console.log("Error in getUserForSidebar: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }   
}
export const getMesages = async (req,res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId}
            ]
        });
        return res.staus(200).json(messages);
    } catch (error) {
        console.log("Error in getUserForSidebar: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const receiverId = req.user._id;
        const {id: userToChatId} = req.params;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const message = await Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await message.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", message);
        }
        res.status(201).json({message: "created messagge successfully"});
    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        return res.status(500).jsoon({message: "Internal server error"});
    }
}