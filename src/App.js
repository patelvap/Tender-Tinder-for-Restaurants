import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Search from './components/Search';
import MenuBar from './components/Menubar';
import Popup from './components/Popup';
import Settings from './components/Settings'
import Results from './components/Results';
import Reviews from './components/Reviews';
import './App.css';
import { Container, Button, Columns } from 'bloomer';
import Review from './components/Reviews';

const fetch = require('node-fetch');
//const clientID = `jxpavrW-66I3Obpstl8qYA`; //our yelp API client id       
const apiKey=`pm8o9ejAV8iA0lnYN8fK4lEKdh6nVH3foW1CB76vo0kVN9IK6dqv6awLhlVSWpm81FeaXAgGyEOnycrvc6HdXlPtbcQv7vC1wvOjkJ4Ei7LLrhvH-K3xQHtxafbWXXYx`; //our yelp api key    

class App extends Component {
  constructor() {
    super();
    this.state = {
        showPopup: false,
        loggedIn: null,  //string username of logged in user, default null
        results : 'none', //array of returned items from api call

        latitude: '', //(required)
        longitude: '', //(required)
        categories: '', //delimited strong of categories (optional)
        radius: '', //(optional)
        term: '', //(optional)
        offset: '', //(optional)
        limit : '', //(optional)\
    }
    navigator.geolocation.getCurrentPosition((position => {
      this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
      });
    }))
  }
  
  getTargets = (latitude, longitude, categories, radius, term, offset, limit) => {
    let queryString = `https://api.yelp.com/v3/businesses/search?`;

    //checks for parameters empty or undefined
    const checkLat = (latitude === undefined || latitude === '');
    const checkLong = (longitude === undefined || longitude === '');
    const checkCats = (categories === undefined || categories === '');
    const checkRad = (radius === undefined || radius === '');
    const checkSearch = (term === undefined || term === '');
    const checkOffset = (offset === undefined || offset === '');
    const checkLimit = (limit === undefined || limit === '');

    if (checkLat && checkLong && checkCats && checkRad && checkSearch && checkOffset && checkLimit) {
        queryString = '';
    }
    else {
        queryString += `latitude=${latitude}&longitude=${longitude}`;
        if (!checkCats) { queryString += `&categories=${categories}` }
        if (!checkRad) { queryString += `&radius=${radius}` }
        if (!checkSearch) { queryString += `&term=${term}` }
        if (!checkOffset) { queryString += `&offset=${offset}` }
        if (!checkLimit) { queryString += `&limit=${limit}` }
    }

    fetch(`https://cors-anywhere.herokuapp.com/${queryString}`, {
          headers: {'Authorization': `Bearer ${apiKey}`},
          'Content-Type': 'application/json',
          'Accept': 'application/json'
    })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          this.setState({
              results: data,
              latitude: latitude,
              longitude: longitude,
              categories: categories,
              radius: radius,
              term: term,
              offset: offset,
              limit: limit
          })
      })
      .catch(() => {
          this.setState({
              results: 'none',
              latitude: latitude,
              longitude: longitude,
              categories: categories,
              radius: radius,
              term: term,
              offset: offset,
              limit: limit
          });
      });
  }

  // function that controls the login popup
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  // function that controls the login popup
  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }


  //function that handles account settings button press
  handleSettings(e){
    console.log(e.target.getAttribute('user')+" tried pressing settings")
    this.toggleSettings();
  }

  handleUserDone(e) {
    console.log(e.target.getAttribute('status'))
    console.log(e.target.getAttribute('username'))
    console.log(e.target.getAttribute('password'))

  }

  render() {
    return (
      <Router basename = { process.env.PUBLIC_URL }>
        <div className="App">
          <MenuBar 
            loggedIn={this.state.loggedIn} 
            handleSettings={this.handleSettings.bind(this)} 
            loginPopup={this.togglePopup.bind(this)}
          />
          <Header />
          <br></br>
          <Route path="/search" strict render={(props) => (
            <Container>
              <Search getTargets={this.getTargets} {...props} />
              <Columns isCentered>
                <Results results={this.state.results.businesses} />
              </Columns>
            </Container>
          )} />
          <Route path="/reviews" strict render={(props) => (
            <Container>
              <Review getTargets={this.getTargets} {...props} />
              <Columns isCentered></Columns>
            </Container>
          )} />
          <div id="loginPopup">
            {this.state.showPopup ? 
                <Popup
                  closePopup={this.togglePopup.bind(this)}
                  handleUserDone={this.handleUserDone.bind(this)}
                />
                : null
            }
          </div>
          <div id="settingsPopup">
            {this.state.showSettings ? 
                <Settings
                  closeSettings={this.toggleSettings.bind(this)}
                  loggedIn={this.state.loggedIn}
                />
                : null
            }
          </div>
        </div>
      </Router>
    )
  }
}

export default App;