import { type Plan, type User, type UserSubscription, type BillingResponse } from "../types/types"

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
          let message = 'Request failed';
          let type = 'Error';
          try {
            const errorData = await response.json();
            
            type = errorData.detail.type;
            message = errorData.detail.message;
            
          } catch (error) {
            console.error(error)
          }
            throw Error(`${type}: ${message}`)
        };
        return await response.json();
    } catch (error) {
        console.error(error);
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

export const signOut = async () => {
    window.location.href = `${URL}/auth/signout`
}

export const getMe = async (): Promise<User | null> => {
    try {
        const response = await apiRequest(`${URL}/users/me`, {
            credentials: "include"
        })

        if (response.status === 401) {
            return null;
        }

        return response;
    } catch (error) {
        console.error(`Error fetching user: ${error}`);
        throw error;
    }
}

export const getBillingHistory = async (): Promise<BillingResponse> => {
    try {
        const response = await apiRequest(`${URL}/payments/billing`, {
            credentials: "include"
        })

        return response;
    } catch (error) {
        console.error(`Error fetching billing history: ${error}`);
        throw error;
    }
}

export const getUserSubscription = async (): Promise<UserSubscription> => {
    try {
        const response = await apiRequest(`${URL}/payments/get-user-subscription`, {
            credentials: "include"
        })

        return response;
    } catch (error) {
        console.error(`Error fetching user subscription: ${error}`);
        throw error;
    }
}

export const cancelSubscription = async (): Promise<UserSubscription> => {
    try {
        const data = await apiRequest(`${URL}/payments/cancel-subscription`, {
            method: "POST",
            credentials: "include"
        })
        console.log(data)
        return data;
    } catch (error) {
        console.error(`Error canceling user subscription: ${error}`);
        throw error;
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
        console.error(`Error creating checkout session: ${error}`);
        throw error;
    }
}