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
    const [rates, setRates] = useState([]);
    const [currentRate, setCurrentRate] = useState("EUR");
    const [convertedPrices, setConvertedPrices] = useState([]);
    const isMediumScreen = useMediaQuery("(max-width: 1200px)");

    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const indexOfLastHotel = currentPage * resultsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - resultsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(hotels.length / resultsPerPage);

    useEffect(() => {
        const fetchRates = () => {
            const { rates, error } = getRates();
            if (rates) {
                setRates(rates);
            } else {
                console.error(error);
            }
        };

        setAllHotels(hotels);
        fetchRates();
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

    const handleRateChange = (e) => {
        setCurrentRate(e.target.value);
        console.log(getExchangeRate("EUR", e.target.value))
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

    const filterHotelsByPrice = () => {
        const filteredHotels = allHotels.filter(hotel =>
            hotel.priceRange >= lowPrice && hotel.priceRange <= highPrice
        );
        setHotels(filteredHotels);
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
                            <p className="text-black-50 text-center mt-5">No hay resultados para los filtros aplicados</p>
                        }
                    </div>
                    <div className="mt-5 p-4 border-top border-bottom">
                        <h2 className="fw-bold mb-4">Nombre del hotel</h2>
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
                        <h2 className="fw-bold mb-4">Seleccionar divisas</h2>
                        <Form.Select onChange={handleRateChange}>
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}{` (${currencySymbols[currency]})`}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="p-4 border-bottom">
                        <h2 className="fw-bold mb-4">Filtrar por</h2>
                        <Row>
                            <h3 className="fw-bold mb-3 fs-4">Precio</h3>
                            <Col>
                                <FloatingLabel controlId="floatingMin" label="Mínimo" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={lowPrice}
                                        onChange={(e) => setLowPrice(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingMax" label="Máximo" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={highPrice}
                                        onChange={(e) => setHighPrice(Number(e.target.value))}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Button className="mt-2 w-100" onClick={filterHotelsByPrice}>Aplicar filtro</Button>
                    </div>
                </Col>
                <Col xl={9} className="px-5">
                    <Row className="d-flex justify-content-between align-items-center w-100">
                        <Col xs={8} className="p-4">
                            <h1 className="fw-bold">Busca tu hotel</h1>
                            <small>{Object.keys(hotels[0]).length > 0 ? hotels.length : 0} resultados</small>
                        </Col>
                        <Col xs={4} className="m-0 p-0">
                            <FloatingLabel controlId="floatingSelect" label="Ordenado por">
                                <Form.Select className="mt-1" onChange={handlePriceOrderChange} value={priceOrder}>
                                    <option value="up">Precio (creciente)</option>
                                    <option value="down">Precio (decreciente)</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        {
                            Object.keys(hotels[0]).length > 0 ?
                                currentHotels.map((hotel, i) => (
                                    <Col xs={12} key={hotel.name}>
                                        <HotelCard
                                            hotelName={hotel.name}
                                            city={hotel.address.addressLocality}
                                            street={hotel.address.streetAddress}
                                            price={hotel.priceRange}
                                            bestStars={parseInt(hotel.starRating.bestRating)}
                                            stars={parseInt(hotel.starRating.ratingValue)}
                                            userRating={0}
                                            reviews={hotel.review}
                                        />
                                    </Col>
                                )) :
                                <p className="text-black-50 text-center mt-5">No hay resultados para los filtros aplicados</p>
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
        </Container>
    );
}
