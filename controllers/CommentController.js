import CommentModel from "../models/commentModel.js";
import PostModel from "../models/postModel.js";
import mongoose from "mongoose";

// Create a Comment
const createComment = async (req, res) => {
    var { id } = req.params; // Post ID
    const { user_id, comment } = req.body; // New comment data
    id = id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }
    try {
        const newComment = new CommentModel({
        comment_user_id: user_id,
        comment,
        post_id:id,
        });

        await newComment.save();
        const updatedPost = await PostModel.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } }, // Pushing the ObjectId of the new comment
        { new: true, runValidators: true }
        ).populate('comments'); // Populate the comments field with the actual comments data

        if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  export const getAllComments = async(req,res)=>{
    let { id } = req.params;
    let postId = id;
    postId = postId.trim();
    

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        const post = await PostModel.findById(postId);

        if (!post) {
        return res.status(404).json({ message: 'Post not found' });
        }

        await post.populate('comments');

        res.status(200).json(post.comments); // Return the comments array
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  export default createComment
