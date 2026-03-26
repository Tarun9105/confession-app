import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    confessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Confession',
      required: true
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    reason: {
      type: String,
      enum: ['SPAM', 'HARASSMENT', 'OFFENSIVE', 'SELF_HARM', 'OTHER'],
      default: 'OTHER'
    },
    details: {
      type: String,
      trim: true,
      maxlength: 200
    }
  },
  { timestamps: true }
);

reportSchema.index({ confessionId: 1, deviceId: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
