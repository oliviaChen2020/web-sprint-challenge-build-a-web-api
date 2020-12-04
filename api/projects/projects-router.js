// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

// GET request to get all projects
router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The projects data could not br retrieved' });
    });
});

// GET request to get a project with the specified projectID
router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The project data could not be retrieved.' });
    });
});

// POST request to add a new project
router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'the missing field is required' });
  } else {
    Projects.insert(req.body)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error adding the new project' });
      });
  }
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'all fields are required' });
  } else {
    Projects.update(id, changes)
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error updating the project' });
      });
  }
});

// DELETE request to delete an project with the specified actionID
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'The project has been deleted' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the project',
      });
    });
});

// GET request to get all actions to an project with the specified projectID
router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(400).json({ errorMessage: 'project not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error retrieving the data' });
    });
});
module.exports = router;
