import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Search from './components/Search';
import './App.css';
import { Container } from 'bloomer';
const fetch = require('node-fetch');
//const clientID = `jxpavrW-66I3Obpstl8qYA`; //our yelp API client id       
const apiKey=`pm8o9ejAV8iA0lnYN8fK4lEKdh6nVH3foW1CB76vo0kVN9IK6dqv6awLhlVSWpm81FeaXAgGyEOnycrvc6HdXlPtbcQv7vC1wvOjkJ4Ei7LLrhvH-K3xQHtxafbWXXYx`; //our yelp api key    

class App extends Component {
  constructor() {
    super();
    this.state = {
        results : 'none', //array of returned items from api call

        latitude: '', //(required)
        longitude: '', //(required)
        categories: '', //delimited strong of categories (optional)
        radius: '', //(optional)
        term: '', //(optional)
        offset: '', //(optional)
        limit : '', //(optional)
    }
  }

  getTargets = (latitude, longitude, categories, radius, term, offset, limit) => {
    let queryString = `https://api.yelp.com/v3/business/seach?`;

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
        queryString += `latitude=${latitude}&longitude=${longitude}&`;
        if (!checkCats) { queryString += `categories=${categories}&` };
        if (!checkRad) { queryString += `radius=${radius}&` };
        if (!checkSearch) { queryString += `term=${term}&` };
        if (!checkOffset) { queryString += `offset=${offset}&` };
        if (!checkLimit) { queryString += `limit=${limit}` };
    }
    
      fetch('https://cors-anywhere.herokuapp.com/' + queryString, {
          headers: {'Authorization': 'Bearer ' + apiKey},
      })
        .then(response => {response.json(); console.log(response);})
        .then(data => {
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

  render() {
    return (
      <Router basename = { process.env.PUBLIC_URL }>
        <div className="App">
          <Header />
          <Route path="/" strict render={(props) => (
            <Container>
              <Search getTargets={this.getTargets} {...props} />
            </Container>
          )} />
        </div>
      </Router>
    )
  }
}

export default App;