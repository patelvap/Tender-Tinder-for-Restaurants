import React, { Component } from "react";
import { Card,
  CardImage,
  Image,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content,
  Box,
  Button,
  Icon,
  Container,
  Columns,
  Column } from "bloomer";
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
    if(this.state.users.length ==0) {
      return(
        <Box> 
          <Title>
            No Reviews Have Yet Been Uploaded. Be the first to Comment!
          </Title>
        </Box>

      )
    }
    
    for( let i= 0; i<this.state.users.length; i++){
      return (
        <Card>
        <CardContent>
          <Media>
            <MediaContent>
              <Title hasTextAlign isSize={4}>
                {this.state.users[i] + " says:"}
              </Title>
            </MediaContent>
          </Media>
          <Content>
            <Title>
            {this.state.reviews[i]}
            </Title>
          </Content>
        </CardContent>
      </Card>
      );
    }
    
  }
}
