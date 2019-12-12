import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./components/Search";
import MenuBar from "./components/Menubar";
import Popup from "./components/Popup";
import Settings from "./components/Settings";
import Results from "./components/Results";
import Review from "./components/Reviews";
import Comments from "./components/Comments";
import Welcome from "./components/Welcome";
import axios from 'axios';
import "./App.css";
import {
  Container,
  Columns,
  Footer,
  Content,
  Column,
  Icon
} from "bloomer";

const fetch = require("node-fetch");
//const clientID = `jxpavrW-66I3Obpstl8qYA`; //our yelp API client id
const apiKey = `pm8o9ejAV8iA0lnYN8fK4lEKdh6nVH3foW1CB76vo0kVN9IK6dqv6awLhlVSWpm81FeaXAgGyEOnycrvc6HdXlPtbcQv7vC1wvOjkJ4Ei7LLrhvH-K3xQHtxafbWXXYx`; //our yelp api key

class App extends Component {
  constructor() {
    super();
    if (localStorage.getItem('loggedIn') === "null") {
      this.state={
        showPopup: false,
        loggedIn: null, //string username of logged in user, default null
        blacklist: null,
  
        results: "none", //array of returned items from api call
  
        latitude: "", //(required)
        longitude: "", //(required)
        categories: "", //delimited strong of categories (optional)
        radius: "", //(optional)
        term: "", //(optional)
        offset: 0, //(optional)
        limit: "", //(optional)\
        hasrun: false
      }
    } else {
      this.state = {
        showPopup: false,
        loggedIn: localStorage.getItem('loggedIn'), //string username of logged in user, default null
        blacklist: null,
  
        results: "none", //array of returned items from api call
  
        latitude: "", //(required)
        longitude: "", //(required)
        categories: "", //delimited strong of categories (optional)
        radius: "", //(optional)
        term: "", //(optional)
        offset: 0, //(optional)
        limit: "", //(optional)\
        hasrun: false
      };
    }

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  getTargets = (
    latitude,
    longitude,
    categories,
    radius,
    term,
    offset,
    limit
  ) => {
    let queryString = `https://api.yelp.com/v3/businesses/search?`;

    //checks for parameters empty or undefined
    const checkLat = latitude === undefined || latitude === "";
    const checkLong = longitude === undefined || longitude === "";
    const checkCats = categories === undefined || categories === "";
    const checkRad = radius === undefined || radius === "";
    const checkSearch = term === undefined || term === "";
    const checkOffset = offset === undefined || offset === "";
    const checkLimit = limit === undefined || limit === "";

    if (
      checkLat &&
      checkLong &&
      checkCats &&
      checkRad &&
      checkSearch &&
      checkOffset &&
      checkLimit
    ) {
      queryString = "";
    } else {
      queryString += `latitude=${latitude}&longitude=${longitude}`;
      if (!checkCats) {
        queryString += `&categories=${categories}`;
      }
      if (!checkRad) {
        queryString += `&radius=${radius}`;
      }
      if (!checkSearch) {
        queryString += `&term=${term}`;
      }
      if (!checkOffset) {
        queryString += `&offset=${offset}`;
      }
      if (!checkLimit) {
        queryString += `&limit=${limit}`;
      }
    }

    fetch(`https://cors-anywhere.herokuapp.com/${queryString}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      "Content-Type": "application/json",
      Accept: "application/json"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          results: data,
          latitude: latitude,
          longitude: longitude,
          categories: categories,
          radius: radius,
          term: term,
          offset: offset,
          limit: limit,
        });
      })
      .catch(() => {
        this.setState({
          results: "none",
          latitude: latitude,
          longitude: longitude,
          categories: categories,
          radius: radius,
          term: term,
          offset: offset,
          limit: limit,
        });
      });
  };

  // function that controls the login popup
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  //function that logs you out
  handleLogout() {
    this.setState({
      loggedIn: null
    });
    localStorage.setItem('loggedIn', null);
    localStorage.setItem('jwt', null);
    window.location.reload();
  }

  //handles intialization of blacklist on account login
  async retrieveUserData() {
    let jwt = localStorage.getItem('jwt')
    try {
       
      const result = await axios({
        method: 'get',
        url: `http://localhost:3000/user/blacklist`,
        headers: {Authorization: `Bearer ${jwt}`},
      });
      this.setBlacklist(result.data.result)
    } catch (error) {
      const result = await axios({
        method: 'post',
        url: `http://localhost:3000/user/blacklist`,
        headers: {Authorization: `Bearer ${jwt}`},
        data: {data: []}
      });
      this.setBlacklist([])
    }

  }

  // function that sets blacklist local value
  setBlacklist(list) {
    this.setState({
      blacklist: list
    })
  }

  //updates blacklist on backend
  async updateBlacklist() {
    let jwt = localStorage.getItem('jwt')
    const result = await axios({
      method: 'post',
      url: `http://localhost:3000/user/blacklist`,
      headers: {Authorization: `Bearer ${jwt}`},
      data: {data: this.state.blacklist}
    });
  }

  // function that controls the login popup
  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }

  //function that handles account settings button press
  handleSettings(e) {
    this.toggleSettings();
  }

  handleUserDone(e) {
    // console.log(e.target.getAttribute("status"));
    // console.log(e.target.getAttribute("username"));
    // console.log(e.target.getAttribute("password"));
  }

  deleteBlacklistItem(e) {
    let toDelete = e.target.getAttribute('id')
    console.log(toDelete)
    let toDelIndex=null
    let newList=this.state.blacklist
    for (let each in newList) {
      if (newList[each].id === toDelete) {
        toDelIndex=each
      }
    }
    newList.splice(toDelIndex, 1)
    this.setBlacklist(newList)
  }

  addToBlacklist(id) {
    let newList=this.state.blacklist;
    newList.push(id);
    this.setState({
      blacklist: newList
    });
    this.updateBlacklist();
  }

  saveSettings() {
    this.updateBlacklist()
    this.toggleSettings()
  }

  cancelSettings() {
    this.retrieveUserData()
    this.toggleSettings()
  }

  checkBlacklist(restaurant) {
    for (let each in this.state.blacklist) {
      if (this.state.blacklist[each].id === restaurant.id) {
        return false;
      }
    }
    return true;
  }

  async incrementUsersStat(user) {
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public",
    });
    pubRoot.post(`/users/`, {
      data: {user},
      type: "merge"
    })
    
  }

  render() {
    if (!this.state.hasrun) {
      if (this.state.loggedIn!==null) {
        this.retrieveUserData()
      }
      this.setState({hasrun:true})
    }
    // let businessestopass=[];
    // if (this.state.businesses===undefined) {businessestopass=undefined}
    // else {businessestopass=this.state.results.businesses.filter(this.checkBlacklist)}
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <MenuBar
            loggedIn={this.state.loggedIn}
            handleSettings={this.handleSettings.bind(this)}
            loginPopup={this.togglePopup.bind(this)}
            handleLogout={this.handleLogout.bind(this)}
          />
          <br />
          
          <Route
            path="/"
            exact strict
            render={props => (
              <div><Container>
                <Welcome getTargets={this.getTargets}
                         username = {this.state.loggedIn}
                                  {...props} />
                <Columns isCentered></Columns>
              </Container>
              <br></br></div>
            )}
          />


          <Route
            path="/search"
            strict
            render={props => (
              <Container>
                <Search getTargets={this.getTargets} {...props} />
                <br></br>
                <Columns isCentered>
                  <Results 
                    results={this.state.results.businesses} 
                    checkBlacklist={this.checkBlacklist.bind(this)}
                    blacklist={this.addToBlacklist.bind(this)}
                    loggedIn={this.state.loggedIn}
                    {...props}
                  />
                </Columns>
              </Container>
            )}
          />
          <Route
            path="/reviews"
            strict
            render={props => (
              <Container>
                <Review getTargets={this.getTargets}
                         username = {this.state.loggedIn}
                                  {...props} />
                <Comments getTargets={this.getTargets} {...props} />
                <Columns isCentered></Columns>
              </Container>
            )}
          />
          <Footer id="footer">
            <Container>
              <Content>
                <Columns>
                  <Column isFull>
                    <p>
                      Made with
                      <Icon
                        hasTextColor="danger"
                        className="fa fa-heart"
                      ></Icon>
                      by Tenderizers
                    </p>
                    <br></br>
                    <p>Stay Hungry My Friends 
                    </p>
                  </Column>
                </Columns>
              </Content>
            </Container>
          </Footer>
          <div id="loginPopup">
            {this.state.showPopup ? 
                <Popup
                  loggedIn={this.state.loggedIn}
                  closePopup={this.togglePopup.bind(this)}
                  handleUserDone={this.handleUserDone.bind(this)}
                  setStateApp={this.setState.bind(this)}
                  retrieveUserData={this.retrieveUserData.bind(this)}
                  incrementUsersStat={this.incrementUsersStat.bind(this)}
                />
                : null
            }
          </div>
          <div id="settingsPopup">
            {this.state.showSettings ? (
              <Settings
                closeSettings={this.cancelSettings.bind(this)}
                loggedIn={this.state.loggedIn}
                blacklist={this.state.blacklist}
                onDelete={this.deleteBlacklistItem.bind(this)}
                saveSettings={this.saveSettings.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;