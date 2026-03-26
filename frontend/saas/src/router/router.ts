import { createBrowserRouter } from "react-router";
import App from "../App";
import Success from "../pages/success";
import Pricing from "../pages/pricing";
import User from "../pages/user";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/user",
        Component: User,
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