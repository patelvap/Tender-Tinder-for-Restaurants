import React, { Component } from "react";
import { Container, Label, Column } from "bloomer";
import BlacklistButton from "./BlacklistButton";

class Blacklist extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };
    }

  render() {
    if (this.props.blacklist === "none" || this.props.blacklist === undefined || this.props.blacklist===null) {
        return null;
      }
    
      if (this.props.blacklist.length === 0) {
        return (
          <Container>
            <Label>No Restaurants on Blacklist</Label>
          </Container>
        );
      }
    
      return (
        <Column isSize="1/2">
          {this.props.blacklist.map(item => {
            return (
              <BlacklistButton
                restaurant={item}
                onDelete={this.props.onDelete}
              />
            );
          })}
        </Column>
      );
  }
};

export default Blacklist;