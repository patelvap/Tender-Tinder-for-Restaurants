import React from 'react';
import { Hero, HeroBody, Container, Title } from 'bloomer';

const Header = () => {
    return (
        <Hero isColor='info' isSize='medium'>
            <HeroBody>
                <Container hasTextAlign='left'>
                    <Title>Tender: Tinder Restaurant Edition</Title>
                </Container>
            </HeroBody>
        </Hero>
    );
}

export default Header;