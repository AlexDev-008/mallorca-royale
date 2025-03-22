import React from 'react';
import {Col, Row} from "react-bootstrap";

export function CustomFooter(props) {
    return (
        <>
            <Row className="gx-0 p-5 text-light" style={{backgroundColor: "#232323"}}>
                <Col>
                    <p>© 2025 Mallorca Royale, Inc., una empresa de Mallorca Royale Group. Todos los derechos reservados.
                        Mallorca Royale y el logotipo de Mallorca Royale son marcas comerciales o marcas comerciales
                        registradas de Mallorca Royale, Inc. Vacationspot, S.L., Agencia de Viajes, I-AV-0000631.3.
                    </p>
                </Col>
            </Row>
        </>
    );
}