import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button } from 'bloomer';

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
            <h1>{this.props.text}</h1>
          <button isColor='primary' type='submit' onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
}
  
