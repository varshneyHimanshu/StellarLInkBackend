import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a chat between the sender and receiver already exists
    let chat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (chat) {
      // If chat exists, return it
      return res.status(200).json(chat);
    } else {
      // If chat does not exist, create a new chat
      const newChat = new ChatModel({
        members: [senderId, receiverId],
      });

      chat = await newChat.save();
      return res.status(200).json(chat);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};