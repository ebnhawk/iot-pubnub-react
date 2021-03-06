const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const PORT = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Logging middleware
app.use(morgan('dev'))

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

// LED

require('./led')()

// Port

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
