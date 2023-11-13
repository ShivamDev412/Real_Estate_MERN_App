import { Schema } from "mongoose";

const ReviewSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
    required: true,
  },
});
export default ReviewSchema;
