import React from 'react';
import {Col, Row} from "react-bootstrap";
import {HotelCarrouselCard} from "./HotelCarrouselCard.jsx";
import {EffectCoverflow} from "swiper/modules";
import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import {t} from "i18next";

export function HotelCarrouselSection(props) {
    return (
        <>
            <Row className="gx-0 p-5 m-5 text-center">
                <Col className="text-center">
                    <h2 className="fw-bold fs-1 mb-5">{t("home.carrouselTitle")}</h2>
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        loop={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 150,
                            modifier: 2.5,
                            scale: 0.8,
                            opacity: 0.5,
                        }}
                        className="text-light d-flex justify-content-center align-items-center mx-5"
                    >
                        <SwiperSlide className="swiper-slide">
                            <HotelCarrouselCard hotelName={1} city={"Palma"} street={"C/ Gaspar y Ferrer nº16"} price={536}></HotelCarrouselCard>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <HotelCarrouselCard hotelName={2} city={"Palma"} street={"C/ Gaspar y Ferrer nº16"} price={536}></HotelCarrouselCard>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <HotelCarrouselCard hotelName={3} city={"Palma"} street={"C/ Gaspar y Ferrer nº16"} price={536}></HotelCarrouselCard>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <HotelCarrouselCard hotelName={4} city={"Palma"} street={"C/ Gaspar y Ferrer nº16"} price={536}></HotelCarrouselCard>
                        </SwiperSlide>
                    </Swiper>
                </Col>
            </Row>
        </>
    );
}