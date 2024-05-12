import mongoose from 'mongoose'
const { Schema, models } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // required: true,
      default: 'student',
    },
  },
  { timestamps: true }
)

const User = models.User || mongoose.model('User', userSchema)
export default User
