import React, { Component } from 'react';
import { Title, Box, Field, Control, Input, Button } from 'bloomer';
import axios from 'axios';

export default class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            comb: [],
            login: ""
        }
        this.getData()
    };
    
    getData() {
        console.log("gjgjggjjg")
        const pubRoot = new axios.create({
            baseURL: "http://localhost:3000/public"
        });
        
        let comb = this.state.comb;
        pubRoot
        .get("/users")
        .then(response => {
            
            comb.push(response.data.result.length)
            console.log("ffff")
            this.updateBoxes(comb);
        })
        .catch(function (error) { });
    }
    
    updateBoxes(c) {
        this.setState({
            comb: c
        });
    }
    
    render() {  
        if(this.state.comb[0]===0){
            return(
                <Box>
                    <Title>
                        Welcome to our page - change this later!!!!!!
                    </Title>
                    <h1>Sign up to be the First User on the Site!</h1>
                </Box>
            )
        }
        
        return (
            <Box>
                <Title>
                    Welcome to Tender
                </Title>
                <h1>Join the more than {this.state.comb[0]} users currently finding great food on our site!</h1>
                <p>
                    Click on the search tab to start looking for restaurants near your location. Make sure to turn on location services for a pleasurable experience. Also feel free to post restaurants suggestions or reviews for us under the Reviews Tab
                </p>
            </Box>
            )
        }
    }
    