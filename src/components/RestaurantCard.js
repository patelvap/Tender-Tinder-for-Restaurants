import React, { Component } from 'react'
import { Card, CardImage, Image, CardContent, Media, MediaContent, Title, Content } from 'bloomer';

class RestaurantCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            imageURL: '',
            phone: '',
            address: '',
            distance: '',
            category: '', //primary category for now
            price: '',
            rating: ''
        }
    }

    render() {
        return (
            <Card>
                <CardImage>
                    <Image isRatio='4:3' src={this.props.imageURL} />
                </CardImage>
                <CardContent>
                    <Media>
                        <MediaContent>
                            <Title isSize={4}>{this.props.name}</Title>
                            {/*<Subtitle isSize={6}>{this.props.categories}</Subtitle>*/}
                        </MediaContent>
                    </Media>
                    <Content>
                        {this.props.rating}-{this.props.price}-{this.props.categories}
                        <br/>
                        {this.props.distance}-{this.props.address}
                    </Content>
                </CardContent>
            </Card>
        )
    }
}

export default RestaurantCard;