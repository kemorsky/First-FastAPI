type RequestOptions = {
    method?: string,
    headers?: { [key: string]: string },
    body?: string,
    credentials?: RequestCredentials;
  }

type Plan = {
    id: number;
    name: string;
    description: string;
    stripe_product_name: string;
    stripe_price_id: string;
    price: number;
}

const URL = "http://localhost:8000/api"

export const apiRequest = async (url: string, options: RequestOptions = {}) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            credentials: "include",
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
    return data
}