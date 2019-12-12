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
  Columns,
  Column
} from "bloomer";

class RestaurantCard extends Component {
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

  render() {
    let cardGoogleURL = `https://www.google.com/maps/place/${this.props.address.split(' ').join('+')}`;

    if (this.props.loggedIn !== null) {
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
                  <Button isColor="danger" isFullWidth 
                    onClick={() => {
                      this.props.updateIndex(this.props.newResults);
                      if (this.props.loggedIn !== null)
                        this.props.blacklist(this.props.result);
                      }
                    }
                  >
                    <Icon isAlign="left" className="fas fa-times"></Icon>
                    <span>I don't like this</span>
                  </Button>
                </Column>
                <Column isSize="1/3">
                  <Button isColor="info" isFullWidth
                    href={cardGoogleURL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon className="far fa-star"></Icon>
                    <span>Show me this!</span>
                  </Button>
                </Column>
                <Column isSize="1/3">
                  <Button isColor="primary" isFullWidth 
                    onClick={() => {
                      this.props.updateIndex(this.props.newResults);
                    }}
                  >
                    <Icon isAlign="right" className="far fa-heart"></Icon>
                    <span>Save for Later</span>
                  </Button>
                </Column>
            </Columns>
          </Box>
        </Card>
      );
    }
    else {
      return(
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
                    <Button isColor="info" isFullWidth
                      href={cardGoogleURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon className="far fa-star"></Icon>
                      <span>Show me this!</span>
                    </Button>
                  </Column>
                  <Column isSize="1/3">
                    <Button isColor="primary" isFullWidth 
                      onClick={() => {
                        this.props.updateIndex(this.props.newResults);
                      }}
                    >
                      <span>Next</span>
                      <Icon isAlign="primary" className="fas fa-arrow-right"></Icon>
                    </Button>
                  </Column>
              </Columns>
            </Box>
          </Card>
        )
    }
  }
}

export default RestaurantCard;
