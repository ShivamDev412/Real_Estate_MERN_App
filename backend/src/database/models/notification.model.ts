import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      listingId:{
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const NotificationModel = mongoose.model('Notification', NotificationSchema);
  export default NotificationModel;
  