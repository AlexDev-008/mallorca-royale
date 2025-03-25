import {Col, Container, Row} from "react-bootstrap";
import {HomeSearch} from "../components/HomeSearch.jsx";
import {FeaturesSection} from "../components/FeaturesSection.jsx";
import {AnimatedSection} from "../components/AnimatedSection.jsx";
import {HotelCarrouselSection} from "../components/HotelCarrouselSection.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {t} from "i18next";
import {MapComponent} from "../components/MapComponent.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpa, faPersonSwimming, faUtensils, faMusic, faDumbbell, faWifi, faBabyCarriage, faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";

export function Hotel() {
    const { hotelName } = useParams();
    const [hotel, setHotel] = useState(null);
    const Icons = {
        "Spa y masajes": faSpa,
        "Piscina": faPersonSwimming,
        "Restaurante gourmet": faUtensils,
        "Eventos y conciertos": faMusic,
        "Gimnasio": faDumbbell,
        "Wi-Fi gratuito": faWifi,
        "Club infantil": faBabyCarriage,
        "Discoteca": faChampagneGlasses
    };

    //Las fotos hay que ponerlas dentro de un "figure", deben ser webp y con jpg de soporte
    //Quitar los strings de value de amenityFeatures (ponerlos como booleanos)
    //Usar JSON-LD para web semántica

    useEffect(() => {
        fetch("/hotels.json")
            .then(response => response.json())
            .then(data => {
                const foundHotel = data.find(h => h.name.toLowerCase() === hotelName.toLowerCase());
                setHotel(foundHotel);
            })
            .catch(error => console.error("Error cargando hoteles:", error));
    }, [hotelName]);

    return (
        <>
            {
                hotel &&
                <>
                    <Container className="my-5">
                        <Row className="gx-0 mb-5">
                            <h1 className="fw-bold">{hotel.name}</h1>
                            <p className="fs-4">
                                <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                                {hotel.address.streetAddress}
                            </p>
                        </Row>
                        <Row className="align-items-stretch mb-5">
                            <Col md={7} className="d-flex">
                                <div
                                    className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/VGWw19FoDII"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col className="d-flex">
                                        <div
                                            className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden">
                                            <img src="/tmp/tmp1.jpg" alt="Imagen1" style={{ height: "350px"}}/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col className="d-flex">
                                        <div className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden">
                                            <img src="/tmp/tmp2.jpg" alt="Imagen2" style={{ height: "350px" }}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={8} className="d-flex justify-content-center flex-column">
                                <Row className="mb-5">
                                    {
                                        [...Array(parseInt(hotel.starRating.bestRating))].map((_, index) => (
                                            <i key={index}
                                               className={`bi bi-star-fill fs-3 ${parseInt(hotel.starRating.ratingValue) > index ? "text-warning" : "text-black-50"}`}
                                               style={{width: "50px"}}>
                                            </i>
                                        ))
                                    }
                                </Row>
                                <Row>
                                    <Col className="text-white">
                                        <p className="primary my-0 p-3 fs-3 rounded-4 text-center">
                                            <span className="fw-bold">{hotel.priceRange}€</span>
                                            {t("hotel.perNight")}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col md={4}>
                                                <p className="fw-bold text-white bg-success my-0 p-3 fs-3 rounded-4 text-center w-100">
                                                    9,1
                                                </p>
                                            </Col>
                                            <Col md={8}>
                                                <Row>
                                                    <p className="fw-bold fs-3 mb-0">Excelente</p>
                                                </Row>
                                                <Row>
                                                    <p>{hotel.review.length} {`${hotel.review.length === 1 ? "comentario" : "comentarios"}`}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <div className="rounded-4 overflow-hidden">
                                    <MapComponent latitude={hotel.geo.latitude} longitude={hotel.geo.longitude}></MapComponent>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <h2 className="fw-semibold">Descripción</h2>
                            <p>{hotel.description}</p>
                        </Row>
                        <Row>
                            <h2 className="fw-semibold mb-3">Acerca de este alojamiento</h2>
                            {
                                hotel.amenityFeature.map((feature, _) => {
                                    return feature.value ? (
                                        <Col md={4} className="d-flex flex-row align-content-center">
                                            <FontAwesomeIcon icon={Icons[feature.name]} className="mt-1" />
                                            <p className="ms-3">{feature.name}</p>
                                        </Col>
                                    ) : null
                                })
                            }
                        </Row>
                    </Container>
                </>
            }
        </>
    );
}