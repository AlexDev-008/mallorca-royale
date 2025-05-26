import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {t} from "i18next";

export function AboutUs() {
    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">{t("aboutUs.aboutUs")}</h1>

            <Row className="mb-5">
                <Col>
                    <p>
                        {t("aboutUs.summary1")}
                    </p>
                    <p>
                        {t("aboutUs.summary2")}
                    </p>
                </Col>
            </Row>

            <Row className="mb-5 d-flex justify-content-between">
                <Col md={5} className="mb-5">
                    <Card>
                        <Card.Img variant="top" src="/developer1.webp" alt="Foto del desarrollador 1" style={{ height: '600px', width: 'auto', objectFit: 'cover' }} />
                        <Card.Body className="primary text-light rounded-bottom-2">
                            <Card.Title className="fs-3">Alex Rodríguez</Card.Title>
                            <Card.Subtitle className="mb-3 text-light">
                                {t("aboutUs.cardSubtitle")}
                            </Card.Subtitle>
                            <Card.Text>
                                {t("aboutUs.cardText")}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5} className="mb-5">
                    <Card>
                        <Card.Img variant="top" src="/developer2.webp" alt="Foto del desarrollador 2"  style={{ height: '600px', width: 'auto', objectFit: 'cover' }}/>
                        <Card.Body className="primary text-light rounded-bottom-2">
                            <Card.Title className="fs-3">Javier Torán</Card.Title>
                            <Card.Subtitle className="mb-3 text-light">
                                {t("aboutUs.cardSubtitle")}
                            </Card.Subtitle>
                            <Card.Text>
                                {t("aboutUs.cardText")}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col>
                    <h2 className="mb-3">{t("aboutUs.videoTitle")}</h2>
                    <div className="ratio ratio-16x9">
                        <video
                            width="100%"
                            height="auto"
                            controls
                            preload="auto"
                            className="rounded-4 shadow"
                            title="Video explicativo del proyecto"
                            aria-label="Video explicativo del proyecto"
                        >
                            <source src="/aboutUs.mp4" type="video/mp4"/>
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                </Col>
            </Row>
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