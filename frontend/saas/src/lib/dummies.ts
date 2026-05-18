import { type User, type Plan, type BillingResponse, type Invoice, type UserSubscription, type PaymentMethod } from "../types/types"

export const EMPTY_USER: User = {
    id: 0,
    oauth_provider: "",
    oauth_id: "",
    stripe_customer_id: "",
    username: "",
    email: "",
    full_name: "",
    picture: "picture",
    disabled: false,
    created_at: "",
    purchases: []
};

export const EMPTY_PLAN: Plan = {
    id: 0,
    name: "",
    description: "",
    stripe_product_name: "",
    stripe_price_id: "",
    price: 0,
}

export const EMPTY_USER_SUBSCRIPTION: UserSubscription = {
    id: 0,
    user_id: 0,
    plan_id: 0,
    stripe_subscription_id: "",
    status: "",
    cancel_at_period_end: false,
    current_period_start: "",
    current_period_end: "",
    plan: EMPTY_PLAN,
    user: EMPTY_USER,
}

export const EMPTY_PAYMENT_METHOD: PaymentMethod = {
    brand: "",
    last4: "",
    exp_month: 0,
    exp_year: 0
}

export const EMPTY_INVOICE: Invoice = {
    id: "",
    amount_paid: 0,
    currency: "",
    description: "",
    status: "",
    date: 0,
    invoice_pdf: "",
    hosted_invoice_url: "",
}

export const EMPTY_BILLING: BillingResponse = {
    billing_email: "",
    payment_method: EMPTY_PAYMENT_METHOD,
    subscription: EMPTY_USER_SUBSCRIPTION,
    invoices: [EMPTY_INVOICE]
};