import React, { Component } from 'react';
import { Box, Field, Control, Button } from 'bloomer';
import Blacklist from './Blacklist'

//testing login popup:



export default class Popup extends Component {
    constructor() {
        super();
        this.state={
            showPopup:false,
        }
    }

    render() {
      
      return (
        <div className='settingspopup'>
          <div style={{padding: '15px'}} className='settingspopup_inner'>
            <br></br>
            <h1 class="title">{this.props.loggedIn}'s Settings:</h1>
            <Box>
                <h2 class="subtitle">Disliked Restaurants:</h2>
                <Field>
                  <Blacklist blacklist={this.props.blacklist} onDelete={this.props.onDelete}></Blacklist>
                </Field>
            </Box>
            <br></br>
            <Box>
                <Field isGrouped>
                    <Control><Button isSize="large" isColor='primary' onClick={this.props.saveSettings}>Save</Button></Control>
                    <Control><Button isSize="large" isColor='primary' type='submit' isLink onClick={this.props.closeSettings}>Cancel</Button></Control>
                </Field>
            </Box>
          
          </div>
        </div>
      );
    }
}
  
