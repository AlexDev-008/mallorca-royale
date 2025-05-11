import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import i18n, {t} from "i18next";
import {MapComponent} from "../components/MapComponent.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpa, faPersonSwimming, faUtensils, faMusic, faDumbbell, faWifi, faBabyCarriage, faChampagneGlasses, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import {useHotels} from "../context/HotelContext.jsx";
import StarRating from "../components/StarRating.jsx";
import {getRatingColor} from "../hooks/getRatingColor.js";
import {getWeather} from "../hooks/getWeather.js";

export function Hotel() {
    const { hotelName } = useParams();
    const [hotel, setHotel] = useState(null);
    const [selectedRating, setSelectedRating] = useState();
    const { hotels } = useHotels();
    const [weather, setWeather] = useState();
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
        const foundHotel = hotels.find(h => h.name.toLowerCase() === hotelName.toLowerCase());
        setHotel(foundHotel);
    }, [hotelName]);

    useEffect(() => {
        if(hotel){
            getWeather(hotel.geo.latitude, hotel.geo.longitude)
                .then(weather => {
                    console.log(weather)
                    setWeather(weather);
                });
        }
    }, [hotel]);

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = i18n.language;
            speechSynthesis.speak(utterance);
        } else {
            alert('Tu navegador no soporta la síntesis de voz.');
        }
    };

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
                        <Row className="align-items-stretch">
                            <Col md={7} className="d-flex mb-5">
                                <div
                                    className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden"
                                    style={{minHeight: "300px"}}
                                >
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={hotel.subjectOf.contentUrl}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </Col>
                            <Col md={5} className="mb-5">
                                <Row>
                                    <Col className="d-flex">
                                        <div
                                            className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden">
                                            <img src={hotel.image[0]} alt="Imagen 1" style={{height: "350px"}} className="rounded-4"/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col className="d-flex">
                                        <div
                                            className="w-100 text-white d-flex align-items-center justify-content-center rounded-4 overflow-hidden">
                                            <img src={hotel.image[1]} alt="Imagen 2" style={{height: "350px"}} className="rounded-4"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={8} className="d-flex justify-content-center flex-column">
                                <Row className="mb-5 d-flex justify-content-between align-items-center">
                                    <Col>
                                        <StarRating bestRating={parseInt(hotel.starRating.bestRating)}
                                                    ratingValue={parseInt(hotel.starRating.ratingValue)}></StarRating>
                                    </Col>
                                    {
                                        weather &&
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <div
                                                className="d-flex px-5 border border-3 rounded-4 justify-content-center align-items-center">
                                                <p className="mb-0 me-3">{weather.current.temp_c} ºC</p>
                                                <img src={`${weather.current.condition.icon}`} alt=""/>
                                            </div>
                                        </Col>
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
                                                <p className="fw-bold text-white my-0 p-3 fs-3 rounded-4 text-center w-100"
                                                   style={{backgroundColor: getRatingColor(9, 1)}}
                                                >
                                                    9,1
                                                </p>
                                            </Col>
                                            <Col md={8}>
                                                <Row>
                                                    <p className="fw-bold fs-3 mb-0">Excelente</p>
                                                </Row>
                                                <Row>
                                                    <p>0 comentarios</p>
                                                    {/*<p>{hotel.review.length} {`${hotel.review.length === 1 ? "comentario" : "comentarios"}`}</p>*/}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <div className="rounded-4 overflow-hidden">
                                    <MapComponent latitude={[hotel.geo.latitude]} longitude={[hotel.geo.longitude]}
                                                  hotelNames={[hotel.name]}></MapComponent>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <div className="d-flex align-items-center">
                                <h2 className="fw-semibold d-inline-block">Descripción</h2>
                                <Button
                                    className="bg-transparent border-0"
                                    onClick={() => speakText(hotel.description)}
                                >
                                    <FontAwesomeIcon icon={faVolumeHigh} color={"black"} size={"xl"}/>
                                </Button>
                            </div>
                            <p>{hotel.description}</p>
                        </Row>
                        <Row className="mb-5">
                            <h2 className="fw-semibold mb-3">Acerca de este alojamiento</h2>
                            {
                                hotel.amenityFeature.map((feature, _) => {
                                    return feature.value ? (
                                        <Col md={4} className="d-flex flex-row align-content-center">
                                            <FontAwesomeIcon icon={Icons[feature.name]} className="mt-1"/>
                                            <p className="ms-3">{feature.name}</p>
                                        </Col>
                                    ) : null
                                })
                            }
                        </Row>
                        <Row className="mb-3">
                            <h2 className="fw-semibold mb-4">Comentarios</h2>
                            <Row className="d-flex justify-content-around">
                                {
                                    [...Array(11)].map((_, index) => (
                                        <Col xs={2} md={1}>
                                            <Button
                                                className={`px-3 mb-3 btn-rating ${selectedRating === index ? "btn-rating-selected" : ""}`}
                                                onClick={() => setSelectedRating(selectedRating === index ? null : index)}
                                            >
                                                {index}
                                            </Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Row>
                        <Row>
                            <Form.Control
                                as="textarea"
                                placeholder="Comentario"
                                className="p-3"
                                style={{height: '100px', borderColor: "#252525"}}
                            />
                        </Row>
                        <Row className="d-flex justify-content-end mt-3 mb-5">
                            <Col className="d-flex justify-content-end p-0">
                                <Button className="me-3 btn-outline">
                                    Cancelar
                                </Button>
                                <Button className="">
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                        <p className="text-light p-3 bg-dark rounded-4">Este hotel no tiene comentarios todavía</p>
                        {/*{*/}
                        {/*    hotel.review.length === 0 &&*/}
                        {/*    <p className="text-light p-3 bg-dark rounded-4">Este hotel no tiene comentarios todavía</p>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    [...Array(hotel.review.length)].map((_, index) => (*/}
                        {/*        <Row className="border-1 p-3 pb-4 rounded-3"*/}
                        {/*             style={{borderColor: "#252525", borderStyle: "solid"}}>*/}
                        {/*            <div className="d-flex align-items-center mb-3">*/}
                        {/*                <span*/}
                        {/*                    className="me-3 py-2 px-3 bg-info rounded-5 ">{hotel.review[index].author.name[0]}</span>*/}
                        {/*                <p className="m-0">{hotel.review[index].author.name}</p>*/}
                        {/*            </div>*/}
                        {/*            <p>{hotel.review[index].reviewBody}</p>*/}
                        {/*            <div>*/}
                        {/*                <span className="me-3 py-2 px-3 rounded-3 text-light"*/}
                        {/*                      style={{backgroundColor: getRatingColor(9, 1)}}*/}
                        {/*                >*/}
                        {/*                    {hotel.review[index].reviewRating.ratingValue}*/}
                        {/*                </span>*/}
                        {/*            </div>*/}
                        {/*        </Row>*/}
                        {/*    ))*/}
                        {/*}*/}
                    </Container>
                </>
            }
        </>
    );
}