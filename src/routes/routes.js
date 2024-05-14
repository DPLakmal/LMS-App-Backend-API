import express from 'express'
import User from '../models/user.js'
import Semesters from '../models/semesters.js'
import Announcement from '../models/announcement.js'

const router = express.Router()

// Middleware for parsing JSON bodies
router.use(express.json())

router.post('/register', async (req, res) => {
  const { username, email, role } = req.body

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(200).json({ message: 'Username already exists' })
    }
    const user = new User({ username, email, role })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//for student
router.post('/student/register', async (req, res) => {
  const { username, email, role } = req.body

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const user = new User({ username, email, role })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email } = req.body
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ email })
    return res.json(existingUser).status(200)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//sem 1 all subject

router.get('/courses/semesters', async (req, res) => {
  try {
    const semesterId = req.query.semesterId
    const semester = await Semesters.find(
      { semester: semesterId },
      { semester: 0, _id: 0 }
    )
    res.json(semester)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// announcement

router.post('/announcement', async (req, res) => {
  const { title, description } = req.body
  try {
    const announcement = new Announcement({ title, description })
    const newAnnouncement = await announcement.save()
    res.status(201).json(newAnnouncement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// read and send to frontend

router.get('/announcement', async (req, res) => {
  try {
    const announcement = await Announcement.find()
    res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//Delete one announcement
router.delete('/announcement/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id)
    res.send(`${deletedAnnouncement.title} has been deleted!`)
  } catch (error) {
    res.status(400).json({ meessage: error.meessage })
  }
})
export default router
