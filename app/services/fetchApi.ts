export async function fetchApi<T = unknown>(input: RequestInfo | URL, init?: RequestInit | undefined) {
 
    try {
        const response = await fetch(`${process.env.ERP_API_BASE_URL}/${input}`, init);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const result = await response.json();
        return result as T;
    } catch (error) {
        throw error;
    }
  
}