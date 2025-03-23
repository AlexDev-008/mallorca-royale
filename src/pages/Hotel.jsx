import {Container} from "react-bootstrap";
import {HomeSearch} from "../components/HomeSearch.jsx";
import {FeaturesSection} from "../components/FeaturesSection.jsx";
import {AnimatedSection} from "../components/AnimatedSection.jsx";
import {HotelCarrouselSection} from "../components/HotelCarrouselSection.jsx";
import React from "react";
import {useParams} from "react-router-dom";

export function Hotel() {
    const { hotelName } = useParams();

    return (
        <Container fluid className="m-0 p-0">
            <h1>{hotelName}</h1>
        </Container>
    );
}