import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

function EditActivity() {
  const { id } = useParams(); // use useParams to get the id parameter

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const activityResponse = await axios.get(
          `/api/activities/${id}`
        );
        const userResponse = await axios.get('/api/users/');

        setUsername(activityResponse.data.username);
        setDescription(activityResponse.data.description);
        setDuration(activityResponse.data.duration);
        setDate(new Date(activityResponse.data.date));
        setUsers(userResponse.data.map(user => user.username));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangeDescription = event => {
    setDescription(event.target.value);
  };

  const onChangeDuration = event => {
    setDuration(event.target.value);
  };

  const onChangeDate = date => {
    setDate(date);
  };

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
      const res = await axios.post(
        `/api/activities/update/${id}`,
        activity
      );
      console.log(res.data);
      window.location = '/'; // navigates to new URL
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <div>
      <h3>Edit Activity Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
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
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Activity Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditActivity;
