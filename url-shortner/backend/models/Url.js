import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
   //todo - add schema here
   {
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, { timestamps: true }
);

export default mongoose.model('Url', urlSchema); 