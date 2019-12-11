import React, { Component } from 'react';
import { Title, View, TextArea, Text, Box, Field, Label, Control, Input, Button } from 'bloomer';

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            latitude: '', //(required)
            longitude: '', //(required)
            categories: '', //delimited strong of categories (optional)
            radius: '', //(optional)
            term: '', //(optional)
            offset: '', //(optional)
            limit: '', //(optional)
        }
        navigator.geolocation.getCurrentPosition((position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }))
    }


    //need to add categories in this - combo box
    render() {
        return (


            <Box>
                <Field>
                    <p>Used for the Review Page</p>
                </Field>

                <Field>
                    <Title>Insert Reviews</Title>
                </Field>

            </Box>

        )
    }
}