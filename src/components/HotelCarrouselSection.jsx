import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {HotelCarrouselCard} from "./HotelCarrouselCard.jsx";
import {Swiper,SwiperSlide} from "swiper/react";
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import {t} from "i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function HotelCarrouselSection({hotels}) {

    const [numberOfSlides, setNumberOfSlides] = useState(3);
    const [showArrows, setShowArrows] = useState(true);

    useEffect(() => {
        const updateSlides = () => {
            setNumberOfSlides(window.innerWidth > 1300 ? 3 : 1);
            // setShowArrows(window.innerWidth > 775);
        };

        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => {
            window.removeEventListener("resize", updateSlides);
        };
    }, []);

    return (
        <>
            <Row className="gx-0 p-5 m-5 text-center">
                <Col className="text-center">
                    <h2 className="fw-bold fs-1 mb-5">{t("home.carrouselTitle")}</h2>
                    <div className="d-flex justify-content-between align-items-center  mb-3">
                        {
                            showArrows &&
                            <Button className="d-flex align-items-center pb-2" id="prevSlide">
                                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                            </Button>
                        }
                        <Swiper
                            modules={[Navigation]}
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={numberOfSlides}
                            loop={true}
                            navigation={{
                                prevEl: "#prevSlide",
                                nextEl: "#nextSlide"
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 150,
                                modifier: 2.5,
                                scale: 0.8,
                                opacity: 0.5,
                            }}
                            className="text-light d-flex justify-content-center align-items-center w-100"
                        >

                            {
                                [...Array(4)].map((_, index) => (
                                    <SwiperSlide className="swiper-slide">
                                        <HotelCarrouselCard
                                            hotelName={hotels[index].name}
                                            city={hotels[index].address.addressLocality}
                                            street={hotels[index].address.streetAddress}
                                            price={hotels[index].priceRange}
                                            image={hotels[index].image[0]}
                                        >
                                        </HotelCarrouselCard>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {
                            showArrows &&
                            <Button className="d-flex align-items-center pb-2" id="nextSlide">
                                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                            </Button>
                        }
                    </div>
                </Col>
            </Row>
        </>
    );
}