import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
const fetch = require('node-fetch');

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  getParams = () => {

  }

  render() {
    return (
      <Router basename = { process.env.PUBLIC_URL }>
        <div className="App">

        </div>
      </Router>
    )
  }
}

export default App;