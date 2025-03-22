import React from 'react';
import {Col, Row} from "react-bootstrap";
import {FeatureCard} from "./FeatureCard.jsx";

export function FeaturesSection(props) {
    return (
        <>
            <section>
                <Row className="gx-0 primary p-5">
                    <Col xl={4}>
                        <FeatureCard
                            title="Busca tu hotel"
                            description="Filtra y busca hoteles según tus necesidades: ubicación, servicios, precio y más."
                            icon="building"
                        >
                        </FeatureCard>
                    </Col>
                    <Col xl={4}>
                        <FeatureCard
                            title="Opiniones y valoraciones"
                            description="Lee reseñas de otros viajeros y deja tu propia opinión para ayudar a otros a tomar la mejor decisión."
                            icon="star-fill"
                        >
                        </FeatureCard>
                    </Col>
                    <Col xl={4}>
                        <FeatureCard
                            title="Precios en tu moneda"
                            description="Consulta el costo de los hoteles en tu moneda local. ¡Sin sorpresas en el precio!"
                            icon="coin"
                        >
                        </FeatureCard>
                    </Col>
                </Row>
            </section>
        </>
    );
}