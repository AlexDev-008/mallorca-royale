import React, {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, InputGroup, Row} from "react-bootstrap";
import {MapComponent} from "../components/MapComponent.jsx";
import Form from 'react-bootstrap/Form';
import {t} from "i18next";
import {useHotels} from "../context/HotelContext.jsx";
import {HotelCard} from "../components/HotelCard.jsx";
import {getRates} from "../hooks/getRates.js";
import {getExchangeRate} from "../hooks/getExchangeRate.js";
import {currencySymbols} from "../hooks/currencySymbols.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import { Pagination } from 'react-bootstrap';

export function HotelSearch() {
    const {hotels, setHotels} = useHotels();
    const [allHotels, setAllHotels] = useState([]);
    const [latitudes, setLatitudes] = useState([]);
    const [longitudes, setLongitudes] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [lowPrice, setLowPrice] = useState();
    const [highPrice, setHighPrice] = useState();
    const [priceOrder, setPriceOrder] = useState("up");
    const isMediumScreen = useMediaQuery("(max-width: 1200px)");
    const [lowStar, setLowStar] = useState();
    const [highStar, setHighStar] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const indexOfLastHotel = currentPage * resultsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - resultsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(hotels.length / resultsPerPage);

    useEffect(() => {
        setAllHotels(hotels);
    }, []);

    useEffect(() => {
        if(hotels && hotels.length > 0 && Object.keys(hotels[0]).length > 0){
            hotels.sort((a,b) => a.priceRange - b.priceRange);
            const latitudes = hotels.map(hotel => hotel.geo.latitude);
            const longitudes = hotels.map(hotel => hotel.geo.longitude);
            setLatitudes(latitudes);
            setLongitudes(longitudes);
            setLowPrice(hotels[0].priceRange);
            setHighPrice(hotels[hotels.length - 1].priceRange);
            setLowStar(hotels[0].starRating.ratingValue);
            setHighStar(hotels[hotels.length - 1].starRating.ratingValue);
        } else {
            setLatitudes([]);
            setLongitudes([]);
            setLowPrice(0);
            setHighPrice(0);
        }
    }, [hotels]);

    useEffect(() => {
        if(allHotels && allHotels.length > 0){
            setMinPrice(allHotels[0].priceRange);
            setMaxPrice(allHotels[allHotels.length - 1].priceRange);
        }
    }, [allHotels]);

    const handlePriceOrderChange = (e) => {
        if (!hotels || hotels.length === 0) return;

        if(e.target.value === "up"){
            setPriceOrder("up");
            hotels.sort((a,b) => a.priceRange - b.priceRange);
        }else if(e.target.value === "down"){
            setPriceOrder("down");
            hotels.sort((a,b) => b.priceRange - a.priceRange);
        }
        setCurrentPage(1);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length > 0) {
            let filtered = allHotels.filter(hotel =>
                hotel.name.toLowerCase().includes(query)
            );
            setHotels(filtered.length > 0 ? filtered : [{}]);
        } else {
            setHotels(allHotels);
        }
        setCurrentPage(1);
    }

    const handlePriceRangeChange = (price) => {
        const newLowPrice = price.min;
        const newHighPrice = price.max;

        if(newLowPrice.min !== lowPrice) {
            setLowPrice(newLowPrice);
        }
        if(newHighPrice.max !== highPrice){
            setHighPrice(newHighPrice);
        }
    }

    const filterHotels = () => {
        let filteredHotels = allHotels.filter(hotel =>
            hotel.priceRange >= lowPrice && hotel.priceRange <= highPrice
        );

        filteredHotels = filteredHotels.filter(hotel =>
            hotel.starRating.ratingValue >= lowStar && hotel.starRating.ratingValue <= highStar
        );

        setHotels(filteredHotels.length > 0 ? filteredHotels : [{}]);
        setCurrentPage(1);
    }

    return (
        <Container fluid className="my-5 px-5">
            <Row>
                <Col xl={3} className={`${!isMediumScreen && "border-end"} px-5`}>
                    <div className="rounded-4 overflow-hidden">
                        {latitudes.length > 0 && longitudes.length > 0 && hotels.length > 0 ?
                            <MapComponent
                                latitude={latitudes}
                                longitude={longitudes}
                                hotelNames={hotels.map((hotel) => hotel.name)}
                            /> :
                            <p className="text-black-50 text-center mt-5">{t("hotelSearch.noResults")}</p>
                        }
                    </div>
                    <div className="mt-5 p-4 border-top border-bottom">
                        <h2 className="fw-bold mb-4">{t("hotelSearch.hotelNameTitle")}</h2>
                        <Form>
                            <InputGroup>
                                <Form.Control
                                    placeholder={t("general.search") + "..."}
                                    aria-label={t("general.search")}
                                    onChange={handleSearch}
                                />
                            </InputGroup>
                        </Form>
                    </div>
                    <div className="p-4 border-bottom">
                        <h2 className="fw-bold mb-4">{t("hotelSearch.filterBy")}</h2>
                        <Row>
                            <h3 className="fw-bold mb-3 fs-4">{t("hotelSearch.price")}</h3>
                            <Col>
                                <FloatingLabel controlId="floatingMin" label={t("hotelSearch.minimum")}
                                               className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={lowPrice}
                                        onChange={(e) => setLowPrice(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingMax" label={t("hotelSearch.maximum")}
                                               className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={highPrice}
                                        onChange={(e) => setHighPrice(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <h3 className="fw-bold mb-3 fs-4">{t("hotelSearch.stars")}</h3>
                            <Col>
                                <FloatingLabel controlId="floatingMin" label={t("hotelSearch.minimum")}
                                               className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={lowStar}
                                        onChange={(e) => setLowStar(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingMax" label={t("hotelSearch.maximum")}
                                               className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={highStar}
                                        onChange={(e) => setHighStar(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Button className="mt-2 w-100"
                                onClick={filterHotels}>{t("hotelSearch.applyFilter")}</Button>
                    </div>
                </Col>
                <Col xl={9} className="px-5">
                    <Row className="d-flex justify-content-between align-items-center w-100">
                        <Col xs={8} className="p-4">
                            <h1 className="fw-bold">{t("hotelSearch.title")}</h1>
                            <small>{(hotels.length > 0 ? (hotels[0] && Object.keys(hotels[0]).length > 0 ? hotels.length : 0) : "")} {t("general.results")}</small>
                        </Col>
                        <Col xs={4} className="m-0 p-0">
                            <FloatingLabel controlId="floatingSelect" label={t("hotelSearch.orderedBy")}>
                                <Form.Select className="mt-1" onChange={handlePriceOrderChange} value={priceOrder}>
                                    <option value="up">{t("hotelSearch.increasingPrice")}</option>
                                    <option value="down">{t("hotelSearch.decreasingPrice")}</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        {
                            hotels.length > 0 && Object.keys(hotels[0])?.length > 0 ?
                                currentHotels.map((hotel, i) => (
                                    <Col xs={12} key={hotel.name}>
                                        <HotelCard
                                            hotelName={hotel.name}
                                            city={hotel.address.addressLocality}
                                            street={hotel.address.streetAddress}
                                            price={hotel.priceRange}
                                            bestStars={parseInt(hotel.starRating.bestRating)}
                                            stars={parseInt(hotel.starRating.ratingValue)}
                                            image={hotel.image[0]}
                                        />
                                    </Col>
                                )) :
                                <p className="text-black-50 text-center mt-5">{t("hotelSearch.noResults")}</p>
                        }
                    </Row>
                    {totalPages > 1 && (
                        <Row className="mt-4">
                            <Pagination className="d-flex justify-content-center">
                                {[...Array(totalPages).keys()].map((number) => (
                                    <Pagination.Item
                                        key={number + 1}
                                        active={number + 1 === currentPage}
                                        onClick={() => setCurrentPage(number + 1)}
                                    >
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Row>
                    )}
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
