import { type Plan, type User, type UserSubscription } from "../types/types"

type RequestOptions = {
    method?: string,
    headers?: { [key: string]: string },
    body?: string,
    credentials?: RequestCredentials;
  }

const URL = "http://localhost:8000/api"

export const apiRequest = async (url: string, options: RequestOptions = {}) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        })
        if (!response.ok) {
          let errorMessage = 'An unknown error occurred';
          try {
            const data = await response.json();
            if (data?.message) {
              errorMessage = data.message;
            }
          } catch (error) {
            console.error(error)
          }
            throw new Error(`${errorMessage}`)
        };
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export const getPlans = async (): Promise<Plan[]> => {
    const data = await apiRequest(`${URL}/payments/get-plans`)
    return data;
}

export const signIn = async () => {
    window.location.href = `${URL}/auth/signin` // fetch doesn't allow OAuth2 to work due to CORS issues
}

export const getMe = async (): Promise<User> => {
    try {
        const data = await apiRequest(`${URL}/users/me`, {
            credentials: "include"
        })
        return data;
    } catch (error) {
        throw new Error (`Error fetching user: ${error}`);
    }
}

export const getUserSubscription = async (): Promise<UserSubscription> => {
    try {
        const data = await apiRequest(`${URL}/payments/get-user-subscription`, {
            credentials: "include"
        })
        return data;
    } catch (error) {
        throw new Error (`Error fetching user subscription: ${error}`);
    }
}

export const cancelSubscription = async (): Promise<UserSubscription> => {
    try {
        const data = await apiRequest(`${URL}/payments/cancel-subscription`, {
            method: "POST",
            credentials: "include"
        })
        return data;
    } catch (error) {
        throw new Error (`Error canceling user subscription: ${error}`);
    }
}

export const createCheckoutSession = async (plan_id: number) => {
    try {
        const data = await apiRequest(`${URL}/payments/create-checkout-session`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ plan_id }),
        })
        window.location.href = data.checkout_url
    } catch (error) {
        throw new Error (`Error creating checkout session: ${error}`);
    }
}