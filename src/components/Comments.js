import React, { Component } from 'react';
import { Column, Content, Title, View, TextArea, Text, Box, Field, Label, Control, Input, Button } from 'bloomer';
import CommentCard from "./CommentCard";
import axios from 'axios';


export default class Review extends Component {
    constructor() {
        super();
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/public"
          });
        

        this.data = ""
        this.state = {
            review : "", //(required)
            username : "tenderboys", //(required)
            events:"ffefe"
        }
    };

    getData() {
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/public"
          });
         pubRoot.get('/reviews')
        .then(function (response) {
        //    console.log("got the data");
           //console.log(response.data.result)
         this.setState({events:response.data.result})
         console.log(this.state.events)
          })
          .catch(function (error) {
        });
    }

    render() {    
      this.getData()
    
        return (
            <Box>
            <Column isSize="1/2">
                <Content>
                    
            {this.state.events}
          </Content>
          </Column>
        </Box>
        )
    }
}