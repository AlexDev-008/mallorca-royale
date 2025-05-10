import {createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {CustomNavbar} from './components/CustomNavbar.jsx';
import {Home} from "./pages/Home.jsx";
import { useTranslation } from 'react-i18next';
import {CustomFooter} from "./components/CustomFooter.jsx";
import {Hotel} from "./pages/Hotel.jsx";
import {createContext, useContext, useEffect, useState} from "react";
import {HotelSearch} from "./pages/HotelSearch.jsx";
import {HotelsProvider, useHotels} from "./context/HotelContext.jsx";
import {AboutUs} from "./pages/AboutUs.jsx";

function App() {
    const { t, i18n } = useTranslation();

    return (
        <HotelsProvider>
            <AppContent t={t} i18n={i18n} />
        </HotelsProvider>
    );
}


function AppContent({ t, i18n }) {
    const { hotels } = useHotels();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home hotels={hotels} />,
        },
        {
            path: "/hotel/:hotelName",
            element: <Hotel />,
        },
        {
            path: "/hoteles",
            element: <HotelSearch />,
        },
        {
            path: "/sobre-nosotros",
            element: <AboutUs />,
        },
    ]);

    return (
        <>
            {
                hotels.length > 0 && (
                    <>
                        <CustomNavbar t={t} i18n={i18n} />
                        <RouterProvider router={router} key={i18n.language} />
                        <CustomFooter />
                    </>
                )
            }
        </>
    );
}



export default App
