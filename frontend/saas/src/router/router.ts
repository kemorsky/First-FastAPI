import { createBrowserRouter } from "react-router";
import App from "../App";
import Success from "../pages/success";
import Pricing from "../pages/pricing";
import User from "../pages/user";
import TestimonialsPage from "../pages/testimonials";

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
    {
        path: "/testimonials",
        Component: TestimonialsPage
    }
])

export default router