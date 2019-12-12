import React, { Component } from "react";
import { Title, Box } from "bloomer";
import axios from "axios";

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      comb: [],
      login: ""
    };
    this.getData();
  }

  getData() {
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public"
    });

    let comb = this.state.comb;
    pubRoot
      .get("/users")
      .then(response => {
        comb.push(response.data.result.length);
        this.updateBoxes(comb);
      })
      .catch(function(error) {});
  }

  updateBoxes(c) {
    this.setState({
      comb: c
    });
  }

  render() {
    if (this.state.comb[0] === 0) {
      return (
        <Box>
          <Title>
            We currently have {this.state.comb[0]} hungry people like you using
            our site. Be the first to get top insight to best local foods
          </Title>
          <h1>Sign up to be the First User on the Site!</h1>
        </Box>
      );
    }

    return (
      <Box>
        <Title>Welcome to Tender</Title>
        <h4>
          Join the more than {this.state.comb[0]} users currently finding great
          food on our site!
        </h4>
        <br></br>
        <br></br>
        <p>
          From the producers of TINDER (jk), comes the new restaurants matching
          app. Get Paired with the best local restaurants with a click of a
          button. Use the search tab to start looking for restaurants near your
          location. Make sure to turn on location services for a pleasurable
          experience.
        </p>
        <br />
        <p>
          Logging in will give you additional features, like reviewing and
          more!. So sign-up now!{" "}
        </p>
      </Box>
    );
  }
}
