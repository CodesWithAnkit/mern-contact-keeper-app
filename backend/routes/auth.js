const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
// validation
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Get Logged In user')
})

router.post(
  '/',
  [
    check('email', 'Please Include a vlaide Emalil').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000000,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(err.message)
      res.status(500).send('server Error')
    }
  }
)

module.exports = router
