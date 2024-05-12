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

const Student = models.User || mongoose.model('Student', userSchema)
export default Student
