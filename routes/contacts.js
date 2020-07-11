const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contacts')

// Get Contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      data: -1,
    })
    res.json(contacts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('server error')
  }
})

// Add contacts
router.post(
  '/',
  [auth, [check('name', 'Name is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, phone, type } = req.body
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      })

      const contact = await newContact.save()

      res.json(contact)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// Update Contacts
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)

    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Make sure user own contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    )

    res.json(contact)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// Delete Contacts
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)

    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Make sure user own contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg: 'contact Removed' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
