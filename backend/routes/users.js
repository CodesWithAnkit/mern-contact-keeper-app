const express = require('express')
const router = express.Router()
// validation
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please provide a valid email adress').isEmail(),
    check(
      'password',
      'Please provide a min length of 6 character password'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    res.send('passed')
  }
)

module.exports = router
