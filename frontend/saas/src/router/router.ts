import { createBrowserRouter } from "react-router";
import App from "../App";
import Success from "../pages/success";
import Pricing from "../pages/pricing";
import User from "../pages/user";
import TestimonialsPage from "../pages/testimonials";
import AccessDeniedPage from "../pages/access-denied";
import { UserInfoRundown, Activity, BillingHistory } from "../ui/blocks/user/user-info";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/user",
        Component: User,
        children: [
            {
                path: "/user",
                Component: UserInfoRundown
            },
            {
                path: "/user/billing-history",
                Component: BillingHistory
            },
            {
                path: "/user/activity",
                Component: Activity
            },
        ]
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
    },
    {
        path: "/access-denied",
        Component: AccessDeniedPage
    }
])

export default router