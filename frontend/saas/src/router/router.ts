import { createBrowserRouter } from "react-router";
import App from "../App";
import Success from "../pages/Success";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/success",
        Component: Success,
    },
])

export default router