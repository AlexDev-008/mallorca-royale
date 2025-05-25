import React from 'react';
import {Col, Row} from "react-bootstrap";
import {t} from "i18next";

export function CustomFooter(props) {
    return (
        <>
            <Row className="gx-0 p-5 text-light" style={{backgroundColor: "#232323"}}>
                <Col>
                    <p>
                        {t("general.footerText")}
                    </p>
                </Col>
            </Row>
        </>
    );
}