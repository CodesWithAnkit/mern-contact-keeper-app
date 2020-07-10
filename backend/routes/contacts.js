const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Get all contacts')
})

router.post('/', (req, res) => {
  res.send('Add contacts')
})

router.put('/:id', (req, res) => {
  res.send('Update contacts')
})

router.delete('/:id', (req, res) => {
  res.send('Update contacts')
})

module.exports = router
