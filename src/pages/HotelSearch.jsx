import React, {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, InputGroup, Row} from "react-bootstrap";
import {MapComponent} from "../components/MapComponent.jsx";
import Form from 'react-bootstrap/Form';
import {t} from "i18next";
import {Link} from "react-router-dom";
import {useHotels} from "../context/HotelContext.jsx";
import {HotelCarrouselCard} from "../components/HotelCarrouselCard.jsx";
import {HotelCard} from "../components/HotelCard.jsx";
import MultiRangeSlider from "../components/MultiRangeSlider.jsx";
import {useExchangeRates} from "../hooks/getRates.js";
import {useExchangeRate} from "../hooks/getExchangeRate.js";
import {currencySymbols} from "../hooks/currencySymbols.js";

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
    const { rates, error } = useExchangeRates();
    const [currentRate, setCurrentRate] = useState("EUR");
    const [convertedPrices, setConvertedPrices] = useState([]);

    useEffect(() => {
        setAllHotels(hotels);
    }, []);

    useEffect(() => {
        if(hotels){
            if(Object.keys(hotels[0]).length > 0){
                hotels.sort((a,b) => a.priceRange - b.priceRange)
                const latitudes = hotels.map(hotel => hotel.geo.latitude);
                const longitudes = hotels.map(hotel => hotel.geo.longitude);
                setLatitudes(latitudes);
                setLongitudes(longitudes);
                setLowPrice(hotels[0].priceRange);
                setHighPrice(hotels[hotels.length - 1].priceRange);
                //setConvertedPrices(hotels.map((hotel) => hotel.priceRange));
            }else{
                setLatitudes([]);
                setLongitudes([]);
                setLowPrice(0);
                setHighPrice(0);
            }
        }
    }, [hotels]);

    useEffect(() => {
        if(allHotels && allHotels.length > 0){
            setMinPrice(allHotels[0].priceRange);
            setMaxPrice(allHotels[allHotels.length - 1].priceRange);
        }
    }, [allHotels]);

    // useEffect(() => {
    //     const { rate } = useExchangeRate("EUR", currentRate);
    //     if (rate) {
    //         setConvertedPrices(hotels.map((hotel) => (hotel.priceRange * rate).toFixed(2)));
    //     }
    // }, [hotels, currentRate]);

    const handlePriceOrderChange = (e) => {
        if (!hotels || hotels.length === 0) return;

        if(e.target.value === "up"){
            setPriceOrder("up");
            hotels.sort((a,b) => a.priceRange - b.priceRange);
        }else if(e.target.value === "down"){
            setPriceOrder("down");
            hotels.sort((a,b) => b.priceRange - a.priceRange);
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length > 0) {
            let filtered = allHotels.filter(hotel =>
                hotel.name.toLowerCase().includes(query)
            );
            if(filtered.length > 0){
                setHotels(filtered);
            }else{
                setHotels([{}]);
            }
        } else {
            setHotels(allHotels);
        }
    }

    const handleRateChange = (e) => {
        setCurrentRate(e.target.value);
    }

    const convertPrice = async (amount, from, to) => {
        //const rate = await getExchangeRate(from, to);
        return rate ? (amount * rate).toFixed(2) : amount;
    };

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
        console.log("FILTRANDO HOTELES: lowPrice = ", lowPrice, " highPrice = ", highPrice );
        const filteredHotels = allHotels.filter(hotel =>
            hotel.priceRange > lowPrice && hotel.priceRange < highPrice
        );

        setHotels(filteredHotels);
    }

    return (
        <>
            {
                <Container fluid className="my-5 px-5">
                    <Row>
                        <Col md={3} className="border-end px-5">
                            <div className="rounded-4 overflow-hidden">
                                {
                                    latitudes.length > 0 && longitudes.length > 0 && hotels.length > 0 ?
                                    (
                                        <MapComponent latitude={latitudes} longitude={longitudes} hotelNames={hotels.map((hotel) => hotel.name)}></MapComponent>
                                    )
                                        :
                                    (
                                        <p className="text-black-50 text-center mt-5">No hay resultados para los filtros aplicados</p>
                                    )
                                }
                            </div>
                            <div className="mt-5 p-4 border-top border-bottom">
                                <h2 className="fw-bold mb-4">Nombre del hotel</h2>
                                <Form>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder={t("general.search") + "..."}
                                            aria-label={t("general.search")}
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => handleSearch(e)}
                                        />
                                    </InputGroup>
                                </Form>
                            </div>
                            <div className=" p-4 border-bottom">
                                <h2 className="fw-bold mb-4">Seleccionar divisas</h2>
                                <Form.Select
                                    onChange={handleRateChange}
                                >
                                    {Object.keys(rates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}{` (${currencySymbols[currency]})`}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div className=" p-4 border-bottom">
                                <h2 className="fw-bold mb-4">Filtrar por</h2>
                                <Row>
                                    <h3 className="fw-bold mb-3 fs-4">Precio</h3>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Mínimo"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={lowPrice}
                                                onChange={(e) => setLowPrice(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Máximo"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={highPrice}
                                                onChange={(e) => setHighPrice(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                {/*<Row className="mb-3">*/}
                                {/*    <MultiRangeSlider*/}
                                {/*        min={minPrice}*/}
                                {/*        max={maxPrice}*/}
                                {/*        onChange={(price) => handlePriceRangeChange(price)}*/}
                                {/*        onMouseUp={() => filterHotelsByPrice()}*/}
                                {/*    />*/}
                                {/*</Row>*/}
                            </div>
                        </Col>
                        <Col md={9} className="px-5">
                            <Row className="d-flex justify-content-between align-items-center w-100">
                                <Col xs={8} className="p-4">
                                    <h1 className="fw-bold">Busca tu hotel</h1>
                                    <small>{Object.keys(hotels[0]).length > 0 ? hotels.length : 0} resultados</small>
                                </Col>
                                <Col xs={4} className="m-0 p-0">
                                    <FloatingLabel controlId="floatingSelect" label="Ordenado por">
                                        <Form.Select className="mt-1" onChange={handlePriceOrderChange} value={priceOrder}>
                                            <option value="up" className="text-black">{"Precio (creciente)"}</option>
                                            <option value="down" className="text-black">{"Precio (decreciente)"}</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    Object.keys(hotels[0]).length > 0 ?
                                    hotels.map((hotel, i) => (
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
                                            >
                                            </HotelCard>
                                        </Col>
                                    )) :
                                    (
                                        <p className="text-black-50 text-center mt-5">No hay resultados para los filtros aplicados</p>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
}