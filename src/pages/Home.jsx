import React from 'react';
import {Col, Container, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {HomeSearch} from "../components/HomeSearch.jsx";
import {FeaturesSection} from "../components/FeaturesSection.jsx";
import {HotelCarrouselSection} from "../components/HotelCarrouselSection.jsx";
import {AnimatedSection} from "../components/AnimatedSection.jsx";

export function Home({hotels}) {
    return (
        <Container fluid className="m-0 p-0">
            <HomeSearch hotels={hotels}></HomeSearch>
            <FeaturesSection></FeaturesSection>
            <AnimatedSection>
                <HotelCarrouselSection hotels={hotels}></HotelCarrouselSection>
            </AnimatedSection>
            <button
                className="btn btn-primary position-fixed bottom-0 end-0 m-3"
                onClick={() => {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }}
                aria-label="Volver al inicio"
            >
                ↑
            </button>
        </Container>
    );
}