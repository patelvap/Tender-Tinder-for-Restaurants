import React, { Component } from "react";
import {
  Card,
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
    const pubRoot = new axios.create({
      baseURL: "http://localhost:3000/public"
    });
 
    let comb = this.state.comb;
    pubRoot
      .get("/reviews")
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
    if (this.state.comb.length == 0) {
      return (
        <Box>
          <Title>
            No Reviews Have Yet Been Uploaded. Be the first to Comment!
          </Title>
        </Box>

      )
    }

    return (
      <Column isSize="1/2">
        {this.state.comb.map(result => {
          return (
          <Card>
            <CardContent>
              <Media>
                <MediaContent>
                  <Title hasTextAlign isSize={4}>
                    {result.user + " says:"}
                  </Title>
                </MediaContent>
              </Media>
              <Content>
                <Title>
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
