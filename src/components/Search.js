import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button } from 'bloomer';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            latitude: '', //(required)
            longitude: '', //(required)
            categories: '', //delimited strong of categories (optional)
            radius: '', //(optional)
            term: '', //(optional)
            offset: '', //(optional)
            limit : '', //(optional)
        }
        navigator.geolocation.getCurrentPosition((position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }))
    }

    updateSearch = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }))
        // this.props.history.push(`latitude=${this.state.latitude}&
        //                         longitude=${this.state.longitude}&
        //                         categories=${this.state.categories}&
        //                         radius=${this.state.radius}&
        //                         term=${this.state.term}&
        //                         offset=${this.state.offset}&
        //                         limit=${this.state.limit}`);
        const {latitude, longitude, categories, radius, term, offset, limit } = this.state;
        this.props.getTargets(latitude, longitude, categories, radius, term, offset, limit);
    }
//need to add categories in this - combo box
    render() {
        return (
            <Box>
                <form onSubmit={this.submit}>
                    <Field isHorizontal>
                        <Label>Search Term</Label>
                        <Control>
                            <Input name="term" type="text" placeholder="Seach Term" onChange={this.updateSearch}></Input>
                        </Control>
                        <Label>Search Radius</Label>
                        <Control>
                            <Input name="radius" type="text" placeholder="Radius" onChange={this.updateSearch}></Input>
                        </Control>
                        <Label>Search Term</Label>
                        <Control>
                            <Input name="term" type="text" placeholder="Seach Term" onChange={this.updateSearch}></Input>
                        </Control>
                        <Label>Result Limit</Label>
                        <Control>
                            <Input name="limit" type="text" placeholder="Limit" onChange={this.updateSearch}></Input>
                        </Control>
                    </Field>
                    <Field>
                        <Button isColor='primary' type="submit">Search</Button>
                    </Field>
                </form>
            </Box>
        )
    }
}