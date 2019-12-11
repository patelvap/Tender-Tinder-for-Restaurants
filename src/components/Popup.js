import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Container } from 'bloomer';
import axios from 'axios';

//testing login popup:



export default class Popup extends React.Component {
    constructor() {
        super();
        this.state={
            showPopup:false,
            isSignUp:false,
            textInfo: "Log In",
            usernameBox: "",
            passBox: "",
            switchModeText: "Don't have an account?",
            modeButton: "Sign Up"
        }
    }

    //monitors UN and PW boxes
    updateCred = (e) => {
        e.preventDefault();
        if (e.target.getAttribute('name')==="username") {
            this.setState({usernameBox: e.target.value})
        } else if (e.target.getAttribute('name')==="password") {
            this.setState({passBox: e.target.value})
        }
    }

    //monitors mode button
    updateMode = (e) => {
        e.preventDefault();
        if (e.target.getAttribute('status')==="Sign Up") {
            this.setState({
                modeButton: "Log In",
                switchModeText: "Already have an account?",
                textInfo: "Sign Up",
                isSignUp: true
            })
        } else if (e.target.getAttribute('status')==="Log In") {
            this.setState({
                modeButton: "Sign Up",
                switchModeText: "Don't have an account?",
                textInfo: "Log In",
                isSignUp: false
            })
        }
    }

    //Submit Handler
    submitHandler = async (e) => {  
        e.preventDefault()
        console.log(e.target)
        console.log(e.target.getAttribute('status')) 
        console.log('Look i am submitting stuff woooo');
          if (e.target.getAttribute('status')==="Sign Up") {
            try {
                const result = await axios({
                  method: 'post',
                  url: 'http://localhost:3000/account/create',
                  data: {
                      name: this.state.usernameBox,
                      pass: this.state.passBox
                  }
                });

                

              } catch (error) {
                console.log(error);
              }
        } else if (e.target.getAttribute('status')==="Log In") {
            try {
                const result = await axios({
                  method: 'post',
                  url: 'http://localhost:3000/account/login',
                  data: {
                      name: this.state.usernameBox,
                      pass: this.state.passBox
                  }
                });
                console.log("success")
                this.props.setStateApp({
                    loggedIn: this.state.usernameBox
                })
                
                console.log(this.props.loggedIn)

              } catch (error) {
                console.log(error);
              }
        }
    }

    render() {
      
      
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <br></br>
            <h1 class="title">{this.state.textInfo}:</h1>
            <Box>
                <form status={this.state.textInfo} onSubmit={this.submitHandler}>
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
                        <Control><Button isSize="large" isColor='primary' type='submit' status={this.state.textInfo} username={this.state.usernameBox} password={this.state.passBox} onClick={this.props.handleUserDone}>{this.state.textInfo}</Button></Control>
                        <Control><Button isSize="large" isColor='primary' type='button' isLink onClick={this.props.closePopup}>Cancel</Button></Control>
                    </Field>
                </form>
            </Box>
            <br></br>
            <Box>
                <h2 class="subtitle">{this.state.switchModeText}</h2>
                <Field>
                    <Control>
                        <Button isSize="large" isColor='primary' status={this.state.modeButton} onClick={this.updateMode}>{this.state.modeButton}</Button>
                    </Control>
                </Field>
            </Box>
          
          </div>
        </div>
      );
    }
}
  
