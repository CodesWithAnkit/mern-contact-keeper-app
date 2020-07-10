const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
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
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'User laready exists' })
      }

      user = new User({ name, email, password })
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

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
      console.log(error.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
