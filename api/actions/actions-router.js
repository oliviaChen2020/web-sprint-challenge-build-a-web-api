// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

// GET request to get all actions
router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The actions information could not br retrieved' });
    });
});

// GET request to get action by the specified actionID
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: 'The action with the specified ID does not exist.',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The action data could not be retrieved.' });
    });
});

// POST request to add a new action
router.post('/', (req, res) => {
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: 'the missing field is required' });
  } else {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error adding the new action' });
      });
  }
});

// PUT request to update an action with the specified actionID
router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: 'all fields are required' });
  } else {
    Actions.update(id, changes)
      .then((updatedAction) => {
        res.status(200).json(updatedAction);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error updating the action' });
      });
  }
});

// DELETE request to delete an action with the specified actionID
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'The action has been deleted' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the action',
      });
    });
});
module.exports = router;
