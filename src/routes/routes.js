import express from 'express'
import User from '../models/user.js'
import Semesters from '../models/semesters.js'

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

export default router
