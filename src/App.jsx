import {createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {CustomNavbar} from './components/CustomNavbar.jsx';
import {Home} from "./pages/Home.jsx";
import { useTranslation } from 'react-i18next';
import {CustomFooter} from "./components/CustomFooter.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }
]);

function App() {

    const { t, i18n } = useTranslation();

    return (
      <>
        <CustomNavbar t={t} i18n={i18n}></CustomNavbar>
        <RouterProvider router={router}/>
        <CustomFooter></CustomFooter>
      </>
    )
}

export default App
