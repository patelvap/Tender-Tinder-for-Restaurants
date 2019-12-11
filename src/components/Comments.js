import React, { Component } from "react";
import { Column, Content, Box } from "bloomer";
import CommentCard from "./CommentCard";
import axios from "axios";

export default class Review extends Component {
  constructor() {
    super();
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public"
    });

    this.data = "";
    this.state = {
      review: "", //(required)
      username: "tenderboys", //(required)
      events: "ffefe",
      users: [],
      reviews: [],
      reload: 0
    };
  }

  getData() {
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public"
    });
    // var strr = [];
    let reviews = [];
    let users = [];
    pubRoot
      .get("/reviews")
      .then(response => {
        users.push(response.data.result.username);
        reviews.push(response.data.result.review);
        this.updateBoxes(users, reviews).bind(this);
        // strr.push(response);
      })
      .catch(function(error) {});
  }

  updateBoxes(u, r) {
    this.setState({
      users: u,
      reviews: r
    });
  }

  render() {
    if (this.state.reload < 1) {
      this.getData();
      this.setState({
        reload: 1
      });
    }

    return (
      <Box>
        <Column isSize="1/2">
          <Content>{this.state.users[0]}</Content>
          <Content>{this.state.reviews[0]}</Content>
        </Column>
      </Box>
    );
  }
}
