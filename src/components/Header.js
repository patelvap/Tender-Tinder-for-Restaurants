import React from "react";
import {
  Hero,
  HeroBody,
  Container,
  Title,
  HeroFooter,
} from "bloomer";

const Header = () => {
  return (
    <Hero isColor="info" isSize="1/4">
      <HeroBody>
        <Container hasTextAlign="left">
          <Title>Tender: Tinder Restaurant Edition</Title>
        </Container>
      </HeroBody>
      <HeroFooter> </HeroFooter>
    </Hero>
  );
};

export default Header;
