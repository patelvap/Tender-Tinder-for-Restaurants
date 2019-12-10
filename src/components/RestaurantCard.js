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
                    <Image src={this.props.imageURL} />
                </CardImage>
                <CardContent>
                    <Media>
                        <MediaContent>
                            <Title isSize={4}>{this.props.name}</Title>
                            {/*<Subtitle isSize={6}>{this.props.categories}</Subtitle>*/}
                        </MediaContent>
                     </Media>
                     <Content>
                        {this.props.rating} - {this.props.price} - {this.props.category}
                        <br/>
                        {this.props.distance.toFixed(2)} mi. - {this.props.address}
                    </Content>
                </CardContent>
            </Card>
            )
        }
    }
    
    export default RestaurantCard;