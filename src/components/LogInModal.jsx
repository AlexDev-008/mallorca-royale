import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {getUsers} from "../services/services.js";
import {t} from "i18next";

export function LogInModal({showModal, setShowModal}) {
    const [logIn, setLogIn] = useState(true);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const checkLogIn = async () => {
        const users = await getUsers();

        for(let user of users){
            if(user.email === email && user.password === password){
                localStorage.setItem("username", user.name);
                localStorage.setItem("profileColor", "#" + Math.floor(Math.random()*16777215).toString(16));
                setShowModal(false);
                break;
            } else {
                setError("Correo o contraseña incorrectos");
            }
        }
    }

    const signUp = async () => {
        if (!username || !email || !password) {
            setError("Rellena todos los campos");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("username", username);
                localStorage.setItem("profileColor", "#" + Math.floor(Math.random()*16777215).toString(16));
                setShowModal(false);
            } else {
                setError(data.error || "Error al registrar");
            }
        } catch (err) {
            console.error(err);
            setError("Error de red o del servidor");
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={() => {setShowModal(false)}} centered>
                <Modal.Header closeButton className="primary text-light rounded-1">
                    <Modal.Title>{
                        logIn ?
                            t("general.logIn")
                            :
                            t("general.signUp")
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center">
                    <Form className="d-flex flex-column justify-content-center p-3">
                        {
                            !logIn &&
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>
                                    {t("general.username")}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isInvalid={!!error}
                                />
                            </Form.Group>
                        }
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>
                                {t("general.password")}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!error}
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={() => {logIn ? checkLogIn() : signUp()}}>
                            {
                                logIn ?
                                    t("general.logIn")
                                    :
                                    t("general.signUp")
                            }
                        </Button>
                    </Form>
                    <p className="bg-transparent border-0 text-black text-center">
                        {
                            logIn ?
                                t("general.noAccount")
                                :
                                t("general.haveAccount")
                        }
                        <span
                            className="text-primary cursor"
                            style={{cursor: "pointer"}}
                            onClick={() => setLogIn(!logIn)}
                        >
                            {
                                logIn ?
                                    t("general.logIn")
                                    :
                                    t("general.signUp")
                            }

                        </span>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}