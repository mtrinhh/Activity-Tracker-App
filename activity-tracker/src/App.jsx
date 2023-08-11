import React from 'react'
import { Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Navbar>
        <Route path="/" exact component={ActivitiesList} />
        <Route path="/edit/:id" component={EditAvtivity} />
        <Route path="/create" component={CreateActivity} />
        <Route path="/user" component={CreateUser} />
      </Navbar>
    </Router>
  )
}

export default App
