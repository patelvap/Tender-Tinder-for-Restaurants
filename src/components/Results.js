import React from 'react'
import { Container, Label, Column } from 'bloomer';
import RestaurantCard from './RestaurantCard';

const Results = ({ results }) => {
    if (results === 'none' || results === undefined) {
        return (null);
    }

    if (results.length === 0) {
        return (
            <Container>
                <Label>
                    No Nearby Restaurants Found
                </Label>
            </Container>
        );
    }

    return (
        <Column isSize='1/2'>
            {results.map((result) => {
                return (
                    <RestaurantCard
                        name={result.name}
                        imageURL={result.image_url}
                        phone={result.phone}
                        address={result.location.display_address.join(' ')}
                        distance={result.distance/1609.344}
                        category={result.categories[0].title}
                        price={result.price}
                        rating={result.rating}
                    />
                );
            })}
        </Column>
    );
}

export default Results;