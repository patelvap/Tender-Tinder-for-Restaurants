import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Container } from 'bloomer';

//testing login popup:



export default class Popup extends React.Component {
    constructor() {
        super();
        this.state={showPopup:false}
    }

    render() {
      
      
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <br></br>
            <h1 class="title">{this.props.text}</h1>
            <Box>
                <form onSubmit={this.submit}>
                    <Field isHorizontal>
                        <Label isSize="large">Username:</Label>
                        <Control>
                            <Input name="username" type="text" placeholder="Username"></Input>
                        </Control>
                    </Field>
                    <Field isHorizontal>
                        <Label isSize="large">Password:</Label>
                        <Control>
                            <Input name="radius" type="text" placeholder="Password"></Input>
                        </Control>
                    </Field>
                    <Field isGrouped>
                        <Control><Button isSize="large" isColor='primary'>Log In</Button></Control>
                        <Control><Button isSize="large" isColor='primary' type='submit' isLink onClick={this.props.closePopup}>Cancel</Button></Control>
                    </Field>
                </form>
            </Box>
          
          </div>
        </div>
      );
    }
}
  
