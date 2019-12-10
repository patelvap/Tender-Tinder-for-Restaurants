import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Container } from 'bloomer';

//testing login popup:



export default class Popup extends React.Component {
    constructor() {
        super();
        this.state={
            showPopup:false,
            isSignUp:false,
            textInfo: "Log In",
            usernameBox: "",
            passBox: ""
        }
    }

    updateCred = (e) => {
        e.preventDefault();
        if (e.target.getAttribute('name')=="username") {
            this.setState({usernameBox: e.target.value})
        } else if (e.target.getAttribute('name')=="password") {
            this.setState({passBox: e.target.value})
        }
    }

    render() {
      
      
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <br></br>
            <h1 class="title">{this.state.textInfo}:</h1>
            <Box>
                <form onSubmit={this.submit}>
                    <Field isHorizontal>
                        <Label isSize="large">Username:</Label>
                        <Control>
                            <Input name="username" type="text" placeholder="Username" onChange={this.updateCred}></Input>
                        </Control>
                    </Field>
                    <Field isHorizontal>
                        <Label isSize="large">Password:</Label>
                        <Control>
                            <Input name="password" type="password" placeholder="Password" onChange={this.updateCred}></Input>
                        </Control>
                    </Field>
                    <Field isGrouped>
                        <Control><Button isSize="large" isColor='primary' status={this.state.textInfo} username={this.state.usernameBox} password={this.state.passBox} onClick={this.props.handleUserDone}>{this.state.textInfo}</Button></Control>
                        <Control><Button isSize="large" isColor='primary' type='submit' isLink onClick={this.props.closePopup}>Cancel</Button></Control>
                    </Field>
                </form>
            </Box>
          
          </div>
        </div>
      );
    }
}
  
