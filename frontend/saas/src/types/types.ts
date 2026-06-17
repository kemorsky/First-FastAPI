export type Plan = {
  id?: number;
  name?: string;
  description?: string;
  stripe_product_name?: string;
  stripe_price_id?: string;
  stripe_marketing_features?: string[];
  price?: number;
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

export type PaymentMethod = {
  brand: string
  last4: string
  exp_month: number
  exp_year: number
} | null

export type Invoice = {
  id: string
  amount_paid: number
  currency: string
  description: string
  status: string
  date: number
  invoice_pdf: string
  hosted_invoice_url: string
}

export type BillingResponse = {
  billing_email: string
  payment_method: PaymentMethod
  subscription: UserSubscription
  invoices: Invoice[]
}

export type Step = {
    id: number;
    image: string;
    title: string;
    description: string;
    details: string;
    onClick?: () => void;
}

export type Tab = {
  id: number;
  title: string;
  href: string;
  content: React.ReactNode;
}