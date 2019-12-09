import React from 'react'
import { Container, Label, Column } from 'bloomer';
import RestaurantCard from './RestaurantCard';

export const Results = ({ results }) => {
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
        <Column>
            {results.map((result) => {
                return (
                    <RestaurantCard
                        name={result.name}
                        imageURL={result.image_url}
                        phone={result.phone}
                        address={result.location.address1}
                        distance={result.distance} 
                    />
                )
            })}
        </Column>
    );
}