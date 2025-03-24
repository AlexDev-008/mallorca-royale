import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {HotelCarrouselCard} from "./HotelCarrouselCard.jsx";
import {EffectCoverflow} from "swiper/modules";
import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import {t} from "i18next";

export function HotelCarrouselSection({hotels}) {

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

                        {
                            [...Array(4)].map((_, index) => (
                                <SwiperSlide className="swiper-slide">
                                    <HotelCarrouselCard
                                        hotelName={hotels[index].name}
                                        city={hotels[index].address.addressLocality}
                                        street={hotels[index].address.streetAddress}
                                        price={hotels[index].priceRange}>
                                    </HotelCarrouselCard>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Col>
            </Row>
        </>
    );
}