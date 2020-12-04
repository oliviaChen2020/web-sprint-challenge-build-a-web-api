const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');
// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`
      <h2>Lambda Project API</h2>
    `);
});

module.exports = server;
