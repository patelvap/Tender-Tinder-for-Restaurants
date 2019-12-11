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
  Field
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
        <Label>{this.props.id}</Label>
        <Button isAlign="right" id={this.props.id} onClick={this.props.onDelete}>DELETE</Button>
        </Field>
        </Box>
      </Container>
    );
  }
}

export default BlacklistButton;
