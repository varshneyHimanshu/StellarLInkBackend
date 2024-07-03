import mongoose from "mongoose";
import CommentModel from "./commentModel.js";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String, required : true},
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
    comments :[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },],
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
