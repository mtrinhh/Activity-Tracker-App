import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateActivity() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/users/');
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const activity = {
      username: username,
      description: description,
      duration: duration,
      date: date
    };

    console.log(activity);

    try {
      const res = await axios.post('/api/activities/add', activity);
      console.log(res.data);
      window.location = '/';
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div>
      <h3>Create New Activity</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}>
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={date => setDate(date)} />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default CreateActivity;
