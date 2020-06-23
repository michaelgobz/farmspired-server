const express = require('express')
const debug = require('debug')("app")
const bodyparser = require('body-parser')
const morgan = require('morgan')
const authroutes = require('./routes/authroute')
const cors = require('cors')
const feedbackroutes = require('./routes/feedbackroutes')
const CLIENT_END_POINT = "http://localhost:1234"
const session = require('express-session')
const cookeeparser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 4000

const urlEncode = bodyparser.urlencoded({ extended: false })

app.use(bodyparser.json())
app.use(session({ secret: 'farmspired' }))
app.use(cookeeparser())

require('./config/passport_config')(app)

app.use('/auth', urlEncode, authroutes)
app.use('/feedback' , feedbackroutes)

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.use(cors({
  origin: CLIENT_END_POINT, // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //credentials: true // allow session cookie from browser to pass through
}))



app.get('/', (req, res) => {
  res.redirect(CLIENT_END_POINT)
})

app.listen(port,
  () => console.log(`Server is running on port ${port}!`)
);
