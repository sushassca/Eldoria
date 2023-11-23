import express from 'express'
import { createServer } from 'http'

import injectSocketIO from '../socket/socketIoHandler.js';

import { handler } from '../build/handler.js'

const port = 443
const app = express()
const server = createServer(app)

// Middleware to serve static files (if needed)
app.use(express.static('public'));

// Inject SocketIO
injectSocketIO(server);

app.use(handler)

server.listen(port)
