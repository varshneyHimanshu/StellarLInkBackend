import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment_user_id: { type: String, required: true },
  comment: { type: String, required: true },
  post_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  }
});

var CommentModel = mongoose.model("Comments", commentSchema);

export default CommentModel;
