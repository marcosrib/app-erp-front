export async function fetchApi<T = unknown>(input: RequestInfo | URL, init?: RequestInit | undefined) {

  const defaultHeaders = {
    'Content-Type': 'application/json'
  };

  const headers = {
    ...defaultHeaders,
    ...(init?.headers || {})
  };

  const modifiedInit = {
    ...init,
    headers: headers
  };


  try {
    const response = await fetch(`${process.env.ERP_API_BASE_URL}/${input}`, modifiedInit);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    if (response.status === 204 || response.status === 201) return;

    const result = await response.json();

    return result as T;
  } catch (error) {
    console.log(error );
    throw error;
  }

}