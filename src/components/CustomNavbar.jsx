import React, {useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export function CustomNavbar({t, i18n}) {

    const [isMobile, setIsMobile] = useState(false);

    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        const isMobile = () => {
            setIsMobile(window.innerWidth < 990);
        };

        isMobile();
        window.addEventListener("resize", isMobile);
        return () => {
            window.removeEventListener("resize", isMobile);
        };
    }, []);

    return (
        <Navbar expand="lg" className="primary" variant="dark">
            <Container fluid className="mx-5">
                <Navbar.Brand href="/">
                    <img
                        src="/logo.svg"
                        width="200"
                        height="75"
                        className="d-inline-block"
                        alt="Mallorca Royale Logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </Navbar.Toggle>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-center justify-content-center">
                        <Nav.Link href="/hoteles" className={`${!isMobile && "me-4"} text-light`}>
                            {t("navbar.hotels")}
                        </Nav.Link>
                        <Nav.Link href="/sobre-nosotros" className={`${!isMobile && "me-4"} text-light`}>
                            {t("navbar.aboutUs")}
                        </Nav.Link>
                        <Form.Select
                            onChange={handleChangeLanguage}
                            value={i18n.language}
                            className={`fw-bold ${isMobile ? "mt-3" : "me-4"}`}
                            style={{ width: "70px" }}
                        >
                            <option value="es" className="text-black">ES</option>
                            <option value="en" className="text-black">EN</option>
                        </Form.Select>
                        <Button type="button" className={`${isMobile ? "mt-3 mb-3" : "ms-2"}`}>
                            {t("general.logIn")}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}