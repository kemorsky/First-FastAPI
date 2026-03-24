import { createBrowserRouter } from "react-router";
import App from "../App";
import Success from "../pages/success";
import Pricing from "../pages/pricing";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/success",
        Component: Success,
    },
    {
        path: "/pricing",
        Component: Pricing
    },
])

export default router