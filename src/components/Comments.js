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
        


        this.state = {
            review : "", //(required)
            username : "tenderboys", //(required)
            data: this.getData()
        }
    };

    getData() {
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/public"
          });
        let {data} =   pubRoot.get('/reviews/review');
        
        //console.log(pubRoot.get('/reviews/'))
        return {data};
      }

    render() {
        console.log(this.getData())
        return (
            <Box>
            <Column isSize="1/2">
                <Content>
            {this.state.data.review}
          </Content>
          </Column>
        </Box>
        )
    }
}