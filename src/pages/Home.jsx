import React from 'react';
import {Col, Container, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {HomeSearch} from "../components/HomeSearch.jsx";
import {FeaturesSection} from "../components/FeaturesSection.jsx";
import {HotelCarrouselSection} from "../components/HotelCarrouselSection.jsx";

export function Home() {
    return (
        <Container fluid className="m-0 p-0">
            <HomeSearch></HomeSearch>
            <FeaturesSection></FeaturesSection>
            <HotelCarrouselSection></HotelCarrouselSection>
        </Container>
    );
}