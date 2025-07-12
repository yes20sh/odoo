import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String, // store base64 or image URL
    default: ''
  },
  location: {
    type: String
  },
  skillsOffered: {
    type: [String],
    default: []
  },
  skillsWanted: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'anytime'],
    default: 'anytime'
  },
  profileVisibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  rating: {
    type: Number,
    default: 0
  },
  feedback: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
