import mongoose from 'mongoose'
const { Schema, models } = mongoose

const subjectSchema = new Schema({
  code: String,
  title: String,
  credit: Number,
})

const semesterSchema = new Schema({
  semester: Number,
  subjects: [subjectSchema],
})

const Semesters = mongoose.model('Semesters', semesterSchema)
export default Semesters
