import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import StarRating from "./StarRating.jsx";
import {t} from "i18next";
import {getRatingColor} from "../hooks/getRatingColor.js";
import {Link} from "react-router-dom";

export function HotelCard({hotelName, city, street, price, bestStars, stars, userRating, reviews}) {
    return (
        <>
            <Row className="rounded-4 overflow-hidden primary mx-2 my-3 p-0">
                <Col xs={3} className="p-0">
                    <img src="src/assets/img/homeBackground.jpg" alt="" className="w-100 h-100 object-cover"/>
                </Col>
                <Col xs={9} className="p-4">
                    <h2 className="text-white fw-bold fs-3">{hotelName}</h2>
                    <StarRating bestRating={bestStars} ratingValue={stars}></StarRating>
                    <p className="text-white fs-4 mt-3">{price}€ <small className="opacity-75">{t("hotel.perNight")}</small></p>
                    <Row>
                        <Col xs={2}>
                            <p className="fw-bold text-white my-0 p-3 fs-3 rounded-4 text-center mb-0"
                               style={{backgroundColor: getRatingColor(9, 1), width:"80px"}}
                            >
                                9,1
                            </p>
                        </Col>
                        <Col xs={8} className="text-white">
                            <Row>
                                <p className="fw-bold fs-3 mb-0">Excelente</p>
                            </Row>
                            <Row>
                                <p className="mb-0">{reviews.length} {`${reviews.length === 1 ? "comentario" : "comentarios"}`}</p>
                            </Row>
                        </Col>
                        <Col xs={2} className="d-flex justify-content-end align-items-center">
                            <Link to={`/hotel/${hotelName}`}>
                                <Button className="px-5 h-50">
                                    Ver
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}