import React from 'react';
import {Button, Container, Nav, Navbar, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export function CustomNavbar({t, i18n}) {

    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <Navbar className="primary">
            <Container className="d-flex justify-content-between align-items-center">
                <Row>
                    <Navbar.Brand href="/">
                        <img
                            src="/logo.svg"
                            width="200"
                            height="75"
                            className="d-inline-block"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Row>
                <Row>
                    <Nav className="me-auto">
                        <Nav.Link href="/hoteles" className="me-4 text-light hover-opacity-75">
                            {t("navbar.hotels")}
                        </Nav.Link>
                        <Nav.Link href="/sobre-nosotros" className="me-4 text-light hover-opacity-75">
                            {t("navbar.aboutUs")}
                        </Nav.Link>
                        <Form.Select
                            onChange={handleChangeLanguage}
                            value={i18n.language}
                            className="me-4 fw-bold custom-select"
                            style={{ width: "70px"}}
                        >
                            <option value="es" className="text-black">ES</option>
                            <option value="en" className="text-black">EN</option>
                        </Form.Select>
                        <Button type="submit" className="ms-2">
                        {t("general.logIn")}
                        </Button>
                    </Nav>
                </Row>
            </Container>
        </Navbar>
    );
}