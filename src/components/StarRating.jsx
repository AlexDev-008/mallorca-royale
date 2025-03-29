import React from 'react';
import {Row} from "react-bootstrap";

function StarRating({bestRating, ratingValue}) {
    return (
        <Row>
            {
                [...Array(bestRating)].map((_, index) => (
                    <i key={index}
                       className={`bi bi-star-fill fs-3 ${ratingValue > index ? "text-warning" : "text-black-50"}`}
                       style={{width: "50px"}}>
                    </i>
                ))
            }
        </Row>
    );
}

export default StarRating;