import express from 'express'
import User from '../models/user.js'
import Semesters from '../models/semesters.js'

const router = express.Router()

// Middleware for parsing JSON bodies
router.use(express.json())

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const user = new User({ username, password })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/login', async (req, res) => {
  const username = req.body

  try {
    // Check if username already exists
    const existingUser = await User.findById({ username })
    res.json(existingUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//sem 1 all subject

router.get('/courses/semesters', async (req, res) => {
  try {
    const semesterId = req.query.semesterId
    const semester = await Semesters.find({ semester: semesterId })
    res.json(semester)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
