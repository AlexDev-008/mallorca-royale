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
                        Este proyecto ha sido desarrollado como parte de la asignatura de Tecnología Multimedia de Ingeniería Informática.
                        El objetivo es aplicar los conocimientos impartidos en la asignatura en una aplicación web real y funcional. En esta web app podemos buscar hoteles,
                        filtrarlos, ver detalles sobre los mismos y escribir y leer comentarios de otros usuarios.
                    </p>
                    <p>
                        Se han aplicado las buenas prácticas para el diseño de web apps y la aplicación ha sido desarrollada usando Bootstrap y ReactJS.
                    </p>
                </Col>
            </Row>

            <Row className="mb-5 d-flex justify-content-between">
                <Col md={5} className="mb-5">
                    <Card>
                        <Card.Img variant="top" src="/homeBackground.jpg" alt="Foto del desarrollador 1"/>
                        <Card.Body className="primary text-light rounded-bottom-2">
                            <Card.Title>Alex Rodríguez</Card.Title>
                            <Card.Text>
                                Texto
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5} className="mb-5">
                    <Card>
                        <Card.Img variant="top" src="/homeBackground.jpg" alt="Foto del desarrollador 2" />
                        <Card.Body className="primary text-light rounded-bottom-2">
                            <Card.Title>Javier Torán</Card.Title>
                            <Card.Text>
                                Texto
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col>
                    <h2 className="mb-3">{t("aboutUs.videoTitle")}</h2>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Video explicativo del proyecto"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}