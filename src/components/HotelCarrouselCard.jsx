import React from 'react';
import {Button} from "react-bootstrap";

export function HotelCarrouselCard({hotelName}) {
    return (
        <>
            <div className="rounded-4 overflow-hidden primary mx-5">
                <img src="src/assets/img/homeBackground.jpg" alt="" className="w-100"/>
                <div className="text-light p-4 px-5 text-start">
                    <p>Palma</p>
                    <h3>{hotelName}</h3>
                    <p className="opacity-75">C/ Gaspar y Ferrer nº16</p>
                    <div className="mt-5 d-flex justify-content-between align-items-center">
                        <p className="fs-3 fw-bold m-0">536€</p>
                        <Button className="px-5">Ver oferta</Button>
                    </div>
                </div>
            </div>
        </>
    );
}