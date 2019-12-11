import React, { Component } from 'react';
import { View, TextArea, Text, Box, Field, Label, Control, Input, Button } from 'bloomer';
import axios from 'axios';

export default class Review extends Component {
    constructor() {
        super();
        this.state = {
            review : "", //(required)
            username : "tenderboys" //(required)
        }
    };

    updateReview = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    submit = e => {
        e.preventDefault();
        this.uploadPost();
    };

    uploadPost(){
        console.log("getting her")
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/public"
          });
        pubRoot.post(`/reviews/`, {
            data: {review: this.state.review, username: this.state.username}
          })
          .then(function (response) {
            console.log("itworked");
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    

    
      
    render() {

        return (
            <Box>
                <form onSubmit={this.submit}>
                    <Field>
                        <p>Used for the Review Page</p>
                    </Field>

                    <Field>
                        <Label>Insert Reviews</Label>
                        <Control>
                            <Input
                                name="review"
                                type="text"
                                placeholder="Post Your Review Here"
                                onChange={this.updateReview}
                            ></Input>                        </Control>
                        <Control>
                            <Button
                                isColor="primary"
                                type="submit"
                            >
                                Post!
                            </Button>
                        </Control>
                    </Field>
                </form>
            </Box>
        );
    }

}
