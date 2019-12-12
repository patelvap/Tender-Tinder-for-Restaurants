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
                    Welcome to our page - change this later!!!!!!
                </Title>
                <h1>Number of Users currently using our site</h1>
                <p>
                    {this.state.comb[0]}
                </p>
            </Box>
            )
        }
    }
    