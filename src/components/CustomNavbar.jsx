import React, {useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {LogInModal} from "./LogInModal.jsx";

export function CustomNavbar({t, i18n}) {

    const [isMobile, setIsMobile] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showLogOutMenu, setShowLogOutMenu] = useState(false);
    const loggedIn = !!localStorage.getItem("username");
    const [_, forceUpdate] = useState(false);

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
        <>
            {
                showLogInModal &&
                <LogInModal
                    showModal={showLogInModal}
                    setShowModal={setShowLogInModal}
                ></LogInModal>
            }
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
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto align-items-center justify-content-center">
                            <Nav.Link
                                href="/hoteles"
                                className={`${!isMobile && "me-4"} text-light`}
                            >
                                {t("navbar.hotels")}
                            </Nav.Link>
                            <Nav.Link
                                href="/sobre-nosotros"
                                className={`${!isMobile && "me-4"} text-light`}
                            >
                                {t("navbar.aboutUs")}
                            </Nav.Link>

                            <Form.Select
                                onChange={handleChangeLanguage}
                                value={i18n.language}
                                className={`fw-bold ${isMobile ? "mt-3" : "me-4"}`}
                                style={{ width: "70px" }}
                                aria-label="Selector de idioma"
                            >
                                <option value="es" className="text-black">ES</option>
                                <option value="en" className="text-black">EN</option>
                            </Form.Select>

                            {loggedIn ? (
                                <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Menú de usuario"
                                    onClick={() => setShowLogOutMenu(!showLogOutMenu)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setShowLogOutMenu(!showLogOutMenu);
                                        }
                                    }}
                                    className="d-flex flex-column align-items-center justify-content-center position-relative"
                                    style={{ cursor: "pointer" }}
                                >
                                    <p
                                        style={{
                                            backgroundColor: localStorage.getItem("profileColor"),
                                            borderRadius: "100%"
                                        }}
                                        className={`text-white m-0 py-2 px-3 ${isMobile ? "mt-3" : ""}`}
                                    >
                                        {localStorage.getItem("username")?.toUpperCase()[0]}
                                    </p>
                                    <p className="text-light p-0 m-0">{localStorage.getItem("username")}</p>

                                    {showLogOutMenu && (
                                        <div
                                            className="position-absolute bg-dark text-white rounded shadow p-3"
                                            style={{
                                                top: "calc(100% + 10px)",
                                                right: -10,
                                                left: 0,
                                                zIndex: 999,
                                                minWidth: "120px"
                                            }}
                                        >
                                            <button
                                                className="btn btn-sm btn-danger w-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    localStorage.removeItem("username");
                                                    localStorage.removeItem("profileColor");
                                                    forceUpdate((prevState) => !prevState);
                                                }}
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    className={`${isMobile ? "mt-3 mb-3" : "ms-2"}`}
                                    onClick={() => setShowLogInModal(true)}
                                >
                                    {t("general.logIn")}
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}