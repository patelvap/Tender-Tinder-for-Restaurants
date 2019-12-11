import React, { Component } from 'react'
import { Card, CardImage, Image, CardContent, Media, MediaContent, Title, Content, Field, Button, Icon, Container } from 'bloomer';

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
                <Container>
                    <Field isHorizontal>
                        <Button isColor='danger' isSize='normal'>
                            <Icon isAlign='left' className='fas fa-times'></Icon>
                        </Button>
                        <Button isColor='info'>
                            <Icon className='far fa-star'></Icon>
                        </Button>
                        <Button isColor='primary' isSize='normal'>
                            <Icon isAlign='right' className='far fa-heart'></Icon>
                        </Button>
                    </Field>
                </Container>
            </Card>
            )
        }
    }
    
    export default RestaurantCard;