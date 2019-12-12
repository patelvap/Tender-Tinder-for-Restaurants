import React, { Component } from "react";
import {
  Card,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content,
  Box,
  Column
} from "bloomer";
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
      username: "", //(required)
      events: "ffefe",
      comb: [],
      reload: 0
    };
  }

  getData() {
    let jwt = localStorage.getItem('jwt')
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/private"
    });
 
    let comb = this.state.comb;
    pubRoot
      .get("/reviews", {headers: {Authorization: `Bearer ${jwt}`},})
      .then(response => {
        for (let i = 0; i < response.data.result.length; i++) {
          comb.push({ review: response.data.result[i].review, user: response.data.result[i].username })
        }
        this.updateBoxes( comb).bind(this);
      })
      .catch(function (error) { });
  }

  updateBoxes(c) {
    this.setState({
      comb: c
    });
  }

  render() {
    if (this.state.reload < 1) {
      this.getData();
      this.setState({
        reload: 1
      });
    }
    if (this.state.comb.length === 0) {
      return (
        <Box>
          <Title>
            No Restaurant Suggestions Have Yet Been Uploaded. Be the first to Suggest!
          </Title>
        </Box>
      )
    }

    return (
      <Column hasTextAlign="centered" isSize="1" color="primary">
        {this.state.comb.slice(0).reverse().map(result => {
          return (
          
          <Card color="primary">
            <CardContent>
              <Media>
                <MediaContent>
                  <Title hasTextAlign isSize={3}>
                    {"@" + result.user + " says:"}
                  </Title>
                </MediaContent>
              </Media>
              <Content>
                <Title isSize={5} hasTextAlign="left">
                  {result.review}
                </Title>
              </Content>
            </CardContent>
          </Card>
        )

        }

        )}
        
      </Column>
    )
  }
}
