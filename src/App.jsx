import {createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {CustomNavbar} from './components/CustomNavbar.jsx';
import {Home} from "./pages/Home.jsx";
import { useTranslation } from 'react-i18next';
import {CustomFooter} from "./components/CustomFooter.jsx";
import {Hotel} from "./pages/Hotel.jsx";
import {useEffect, useState} from "react";

function App() {

    const { t, i18n } = useTranslation();
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch("/hotels.json")
            .then(res => res.json())
            .then(data => setHotels(data))
            .catch((error) => console.error("Error cargando hoteles:", error));
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home hotels={hotels} />,
        },
        {
            path: "/hotel/:hotelName",
            element: <Hotel />,
        }
    ]);

    return (
      <>
          {
              hotels.length > 0 &&
              <>
                  <CustomNavbar t={t} i18n={i18n}></CustomNavbar>
                  <RouterProvider router={router} key={i18n.language}/>
                  <CustomFooter></CustomFooter>
              </>
          }
      </>
    )
}

export default App
