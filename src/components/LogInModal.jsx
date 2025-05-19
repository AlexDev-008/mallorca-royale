import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {getUsers} from "../services/services.js";

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

    const signUp = () => {

    }

    return (
        <>
            <Modal show={showModal} onHide={() => {setShowModal(false)}} centered>
                <Modal.Header closeButton className="primary text-light rounded-1">
                    <Modal.Title>{
                        logIn ?
                            "Log In"
                            :
                            "Registro"
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center">
                    <Form className="d-flex flex-column justify-content-center p-3">
                        {
                            !logIn &&
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>
                                    Nombre usuario
                                </Form.Label>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)}/>
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
                                Contraseña
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!error}
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={() => {logIn ? checkLogIn() : null}}>
                            {
                                logIn ?
                               "Inciar sesión"
                                    :
                                "Registrar"
                            }
                        </Button>
                    </Form>
                    <p className="bg-transparent border-0 text-black text-center">
                        {
                            logIn ?
                            "¿No tienes cuenta?"
                                :
                            "¿Ya tienes cuenta?"
                        }
                        <span
                            className="text-primary cursor"
                            style={{cursor: "pointer"}}
                            onClick={() => setLogIn(!logIn)}
                        >
                            {
                                logIn ?
                                " Regístrate"
                                    :
                                " Inicia sesión"
                            }

                        </span>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}