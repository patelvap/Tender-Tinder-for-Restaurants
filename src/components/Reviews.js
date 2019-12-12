import React, { Component } from 'react';
import { View, Title, TextArea, Text, Box, Field, Label, Control, Input, Button } from 'bloomer';
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
        let jwt = localStorage.getItem('jwt')
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/private",
            headers: {Authorization: `Bearer ${jwt}`}
          });
        pubRoot.post(`/reviews/`, {
            data: {review: this.state.review, username: this.props.username},
            headers: {Authorization: `Bearer ${jwt}`},
            type: "merge"
          })
          .then(function (response) {
            console.log("itworked");
            console.log(response)
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
                        <Title isSize={3}>Help others out by giving them suggestions!</Title>
                        <Control>
                            <Input
                                class= "is-rounded"
                                name="review"
                                type="text"
                                placeholder="Post Your Review Here"
                                onChange={this.updateReview}
                            ></Input>  
                        </Control>
                        <br></br>
                        <Control>
                            <Button
                                isColor="link"
                                type="submit"
                                isHovered= "true"
                                ali ="centered"

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