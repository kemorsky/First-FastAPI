export type Plan = {
    id?: number;
    name: string;
    description: string;
    stripe_product_name?: string;
    stripe_price_id?: string;
    price: number;
}

export type User = {
    id: number;
    oauth_provider: string;
    oauth_id: string;
    stripe_customer_id: string;
    username: string;
    email: string;
    full_name: string;
    picture: string;
    disabled: boolean;
    created_at: string;
    purchases: UserSubscription[];
}

export type UserSubscription = {
    id: number;
    user_id: number;
    plan_id: number;
    stripe_subscription_id: string;
    status: string;
    cancel_at_period_end: boolean;
    current_period_start: string;
    current_period_end: string;
    plan: Plan;
    user: User;
}