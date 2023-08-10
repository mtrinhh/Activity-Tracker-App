const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
  Activity.find()
    .then(activities => res.json(activities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newActivity = new Activity({
    username,
    description,
    duration,
    date,
  });

  newActivity.save()
  .then(() => res.json('Activity added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router