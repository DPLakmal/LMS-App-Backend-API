import mongoose from 'mongoose'
const { Schema, models } = mongoose

const subjectSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Subject = models.Subject || mongoose.model('subject', subjectSchema)
export default Subject
