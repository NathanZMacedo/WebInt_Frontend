import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout.jsx";
import ProductPage from "./pages/productpage/ProductPage.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthPage from "./pages/authPage/AuthPage.jsx";
import ComidaPage from "./pages/musicPage/ComidaPage.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "products",
                element: <ProductPage />
            },
            {
                path: "/auth",
                element: <AuthPage/>
            },
            {
                path: "/comidas",
                element: <ComidaPage></ComidaPage>
            }
        ]
    }
])


