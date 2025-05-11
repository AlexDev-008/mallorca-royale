import React, {useEffect} from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {t} from "i18next";

export function HotelCarrouselCard({hotelName, city, street, price, image}) {

    return (
        <>
            <div className="rounded-4 overflow-hidden primary mx-3">
                <img
                    src={image}
                    alt={`Imagen del hotel ${hotelName}`}
                    className="w-100"
                />
                <div className="text-light p-4 px-5 text-start">
                    <p>{city}</p>
                    <h3>{hotelName}</h3>
                    <p className="opacity-75">{street}</p>
                    <div className="mt-5 d-flex justify-content-between align-items-center">
                        <p className="fs-3 fw-bold m-0">{price}€</p>
                        <Link to={`/hotel/${hotelName}`}>
                            <Button className="px-3">{t("home.seeHotel")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}