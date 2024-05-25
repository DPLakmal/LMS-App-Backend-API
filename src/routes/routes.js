import express from 'express'
import User from '../models/user.js'
import Semesters from '../models/semesters.js'
import Announcement from '../models/announcement.js'
import Pastpapers from '../models/pastpapers.js'
import Weeks from '../models/week.js'
import Subject from '../models/subject.js'
import LecturerAnnouncement from '../models/announcement-lecturer.js'

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
    const semesterId = req.query.id
    const semester = await Semesters.findOne({ semester: semesterId })
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
    return res.status(201).json(newAnnouncement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
// announcement

router.post('/lecturerannouncement', async (req, res) => {
  const { title, description, lecturer } = req.body
  try {
    const announcement = new LecturerAnnouncement({
      title,
      description,
      lecturer,
    })
    const newAnnouncement = await announcement.save()
    return res.status(201).json(newAnnouncement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.get('/lecturerannouncement', async (req, res) => {
  try {
    const lannouncement = await LecturerAnnouncement.find()
    return res.status(200).json(lannouncement)
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
router.delete('/announcement', async (req, res) => {
  try {
    const id = req.query.id
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id)
    return res.send(
      `${deletedAnnouncement.title} Announcement deleted successfully!`
    )
  } catch (error) {
    res.status(400).json({ meessage: error.meessage })
  }
})

//

router.get('/pastpapers', async (req, res) => {
  try {
    const code = req.query.code
    const announcement = await Pastpapers.findOne({ code: code })
    res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
router.get('/:subject_code/weeks', async (req, res) => {
  try {
    const { subject_code } = req.params // Extract subject_code from URL parameters
    const { week_no } = req.query
    const week = await Weeks.findOne({ subject_code, week_no })
    res.status(200).json(week)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
router.post('/:subject_code/weeks', async (req, res) => {
  try {
    const { subject_code } = req.params // Extract subject_code from URL parameters
    const { week_no } = req.query // Extract week_no from query parameters
    const { title, link, type } = req.body // Extract title, link, and type from request body

    console.log(subject_code, week_no, { title, link, type })

    if (!title || !link || !type) {
      return res
        .status(400)
        .json({ message: 'Title, link, and type are required' })
    }

    // Find the week by subject_code and week_no
    let week = await Weeks.findOne({ subject_code, week_no })

    if (!week) {
      // If the week is not found, create a new week
      week = new Weeks({ subject_code, week_no, lms: [], lecturer: [] })
    }

    const newEntry = { title, link }

    if (type === 'lms') {
      week.lms.push(newEntry) // Add new entry to lms array
    } else if (type === 'lecturer') {
      week.lecturer.push(newEntry) // Add new entry to lecturer array
    } else {
      return res
        .status(400)
        .json({ message: "Type must be 'lms' or 'lecturer'" })
    }

    const updatedWeek = await week.save() // Save the updated week document

    res.status(200).json(updatedWeek) // Respond with the updated week document
  } catch (error) {
    return res.status(500).json({ message: error.message }) // Error handling
  }
})

router.get('/courses/subject', async (req, res) => {
  try {
    const code = req.query.code
    const announcement = await Subject.findOne({ code: code })
    res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
export default router
