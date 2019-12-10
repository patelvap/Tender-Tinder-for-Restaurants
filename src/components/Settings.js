import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Container } from 'bloomer';

//testing login popup:



export default class Popup extends React.Component {
    constructor() {
        super();
        this.state={
            showPopup:false,
        }
    }

    render() {
      
      
      return (
        <div className='settingspopup'>
          <div className='settingspopup_inner'>
            <br></br>
            <h1 class="title">{this.props.loggedIn}'s Settings:</h1>
            <Box>
                <h2 class="subtitle">Disliked Restaurants:</h2>
            </Box>
            <br></br>
            <Box>
                <Field isGrouped>
                    <Control><Button isSize="large" isColor='primary' onClick={this.props.handleSaveSettings}>Save</Button></Control>
                    <Control><Button isSize="large" isColor='primary' type='submit' isLink onClick={this.props.closeSettings}>Cancel</Button></Control>
                </Field>
            </Box>
          
          </div>
        </div>
      );
    }
}
  
