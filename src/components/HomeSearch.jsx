import React from 'react';
import {Button, Col, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {t} from "i18next";

export function HomeSearch(props) {
    return (
        <>
            <Row className="home-background d-flex flex-column align-items-center gx-0" style={{padding: '15rem 0'}}>
                <Col lg={4} className="text-center pb-5">
                    <h1 className="fw-bold text-light fs-1">{t("home.homePhrase")}</h1>
                </Col>
                <Col lg={3}>
                    <Form>
                        <InputGroup>
                            <Form.Control
                                placeholder={t("general.search") + "..."}
                                aria-label={t("general.search")}
                                aria-describedby="basic-addon1"
                            />
                            <Button className="py-2">
                                <i className="bi bi-search me-2"></i>
                                <span>{t("general.search")}</span>
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
}