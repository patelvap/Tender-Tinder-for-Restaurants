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
        var strr = [];
         pubRoot.get('/reviews')
        .then(function (response) {
        //    console.log("got the data");
           //console.log(response.data.result)
           strr.push(response)
          })
          .catch(function (error) {
        });
        return strr
    }

    render() {    
      console.log(this.getData())
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