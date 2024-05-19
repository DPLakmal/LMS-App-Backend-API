import mongoose from 'mongoose'
const { Schema, models } = mongoose

const newSyallbusSchema = new Schema({
  year: String,
  herf: String,
})
const oldSyallbusSchema = new Schema({
  year: String, // year  of pastpaper
  herf: String, /// file download link
})

const pastpaperSchema = new Schema({
  code: String,
  newSyallbus: [newSyallbusSchema],
  oldSyallbus: [oldSyallbusSchema],
})

const Pastpapers = mongoose.model('Pastpapers', pastpaperSchema)
export default Pastpapers
