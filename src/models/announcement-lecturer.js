import mongoose from 'mongoose'

const { Schema, models } = mongoose

const lecturerAnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lecturer: {
      type: String,
    },
  },
  { timestamps: true }
)

const LecturerAnnouncement =
  models.Lecturerannouncement ||
  mongoose.model('lannouncement', lecturerAnnouncementSchema)

export default LecturerAnnouncement
