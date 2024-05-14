import mongoose from 'mongoose'
const { Schema, models } = mongoose

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Announcement =
  models.Announcement || mongoose.model('Announcement', announcementSchema)
export default Announcement
