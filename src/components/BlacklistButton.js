import React, { Component } from "react";
import {
  Card,
  CardImage,
  Image,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content,
  Box,
  Button,
  Icon,
  Container,
  Columns,
  Column,
  Form,
  Control,
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
        <FieldLabel><Label>{this.props.id}</Label></FieldLabel>
        <FieldBody><Button id={this.props.id} onClick={this.props.onDelete}>DELETE</Button></FieldBody>
        </Field>
        </Box>
      </Container>
    );
  }
}

export default BlacklistButton;
