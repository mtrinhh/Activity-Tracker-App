import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activity = props => (
  <tr>
    <td>{props.activity.username}</td>
    <td>{props.activity.description}</td>
    <td>{props.activity.duration}</td>
    <td>{props.activity.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.activity._id}>edit</Link> |{' '}
      <a href="#" onClick={() => props.deleteActivity(props.activity._id)}>delete</a>
    </td>
  </tr>
);


function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('/api/activities/')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteActivity = id => {
    axios.delete('/api/activities/' + id)
      .then(response => {
        console.log(response.data);
        setActivities(activities.filter(el => el._id !== id));
      });
  };

  return (
    <div>
      <h3>Activities</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(currentActivity => (
            <Activity
              activity={currentActivity}
              deleteActivity={deleteActivity}
              key={currentActivity._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivitiesList;
