import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Label,
  Field,
  FieldLabel,
  FieldBody
} from "bloomer";

class BlacklistButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <Container>
        <Box>
        <Field isGrouped>
        <FieldLabel><Label>{this.props.restaurant.name}, {this.props.restaurant.location.display_address.join(" ")}</Label></FieldLabel>
        <FieldBody><Button id={this.props.restaurant.id} onClick={this.props.onDelete}>DELETE</Button></FieldBody>
        </Field>
        </Box>
      </Container>
    );
  }
}

export default BlacklistButton;
