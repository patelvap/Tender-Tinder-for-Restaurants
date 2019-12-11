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
  Column
} from "bloomer";

class CommentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imageURL: "",
      phone: "",
      address: "",
      distance: "",
      category: "", //primary category for now
      price: "",
      rating: ""
    };
  }

  rendjer() {
    return (
      <Card>
        <CardImage>
          <Image src={this.props.imageURL} />
        </CardImage>
        <CardContent>
          <Media>
            <MediaContent>
              <Title hasTextAlign isSize={4}>
                {this.props.name}
              </Title>
              {/*<Subtitle isSize={6}>{this.props.categories}</Subtitle>*/}
            </MediaContent>
          </Media>
          <Content>
            {this.props.rating}
            <Icon className="fas fa-star"></Icon> - {this.props.price} -{" "}
            {this.props.category}
            <br />
            {this.props.distance.toFixed(2)} mi. - {this.props.address}
          </Content>
        </CardContent>
        <Box>
          <Columns isCentered>
            <Column isSize="1/3">
              <Button isColor="danger" isFullWidth>
                <Icon isAlign="left" className="fas fa-times"></Icon>
                <span>I don't like this</span>
              </Button>
            </Column>
            <Column isSize="1/3">
              <Button isColor="info" isFullWidth>
                <Icon className="far fa-star"></Icon>
                <span>Show me this!</span>
              </Button>
            </Column>
            <Column isSize="1/3">
              <Button isColor="primary" isFullWidth>
                <Icon isAlign="right" className="far fa-heart"></Icon>
                <span>Save for Later</span>
              </Button>
            </Column>
          </Columns>
        </Box>
      </Card>
    );
  }
}

