import React, {useState} from 'react';
import {Button, Col, InputGroup, ListGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {t} from "i18next";
import { useNavigate } from "react-router-dom";

export function HomeSearch({hotels}) {

    const [filteredHotels, setFilteredHotels] = useState([]);
    const [hotelName, setHotelName] = useState();
    const navigate = useNavigate();
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSearch = (e, selectHotel, hotelName) => {
        if(selectHotel) {
            setFilteredHotels([]);
            setHotelName(hotelName)
        }else{
            const query = e.target.value.toLowerCase();

            if (query.length > 0) {
                const filtered = hotels.filter(hotel =>
                    hotel.name.toLowerCase().includes(query)
                );
                setFilteredHotels(filtered);
                setHotelName(query);
            } else {
                setFilteredHotels([]);
            }
        }
    };

    const handleHotelSelect = (hotelName) => {
        const searchBar = document.getElementById("searchBar");
        searchBar.value = hotelName;
        handleSearch(null, true, hotelName)
    }

    const handleSearchClick = () => {
        const exists = hotelName ? hotels.some(hotel => hotel.name.toLowerCase() === hotelName.toLowerCase()) : false;
        if (exists) {
            navigate(`/hotel/${hotelName}`);
        } else {
            setShowFeedback(true);
        }
    };

    return (
        <>
            <Row className="home-background d-flex flex-column align-items-center gx-0" style={{padding: '15rem 0'}}>
                <Col lg={4} xs={10} className="text-center pb-5">
                    <h1 className="fw-bold text-light fs-1">{t("home.homePhrase")}</h1>
                </Col>
                <Col lg={4} xs={10} className="position-relative">
                    <Form>
                        <InputGroup hasValidation>
                            <Form.Control
                                placeholder={t("general.search") + "..."}
                                aria-label={t("general.search")}
                                aria-describedby="basic-addon1"
                                onChange={e => handleSearch(e, false, null)}
                                id="searchBar"
                                isInvalid={showFeedback}
                            />
                            <Button
                                className="py-2 rounded-start-0"
                                onClick={handleSearchClick}
                            >
                                <i className="bi bi-search me-2"></i>
                                <span>{t("general.search")}</span>
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                {t("home.hotelNotFound")}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form>

                    {filteredHotels.length > 0 && (
                        <ListGroup className="mt-2 position-absolute w-100 z-1 overflow-y-scroll" style={{maxHeight: "300px"}}>
                            {filteredHotels.map((hotel, index) => (
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => {
                                        handleHotelSelect(hotel.name);
                                    }}
                                    style={{cursor: "pointer"}}
                                >
                                    <strong>{hotel.name}</strong>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </>
    );
}