const express = require('express')
const { application } = require('express')
const connectDb = require('./config/db')

const app = express()
connectDb()

// Init middleware dore req.body
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.json({ msg: 'Hello wrold' })
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Listening to PORT: ${PORT}`))
