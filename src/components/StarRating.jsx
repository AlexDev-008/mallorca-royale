import React from 'react';
import {Row} from "react-bootstrap";

function StarRating({bestRating, ratingValue}) {
    return (
        <div>
            {
                [...Array(bestRating)].map((_, index) => (
                    <i key={index}
                       className={`bi bi-star-fill fs-3 me-4 ${ratingValue > index ? "text-warning" : "text-black-50"}`}>
                    </i>
                ))
            }
        </div>
    );
}

export default StarRating;