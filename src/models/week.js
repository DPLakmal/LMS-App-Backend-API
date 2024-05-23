import mongoose from 'mongoose'
const { Schema, models } = mongoose

const lms = new Schema({
  title: String,
  link: String,
})
const lecturer = new Schema({
  title: String,
  link: String, /// file download link
})

const weeksSchema = new Schema({
  week_no: String,
  subject_code: String,
  lms: [lms],
  lecturer: [lecturer],
})

const Weeks = mongoose.model('Weeks', weeksSchema)
export default Weeks
