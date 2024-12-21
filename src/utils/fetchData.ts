type FetchDataType = {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  headers?: Record<string, string>;
  body?: unknown;
};

const fetchData = async <T>(
  url: string,
  options?: FetchDataType
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options?.method || "GET",
      headers: {
        "Content-type": "application-json",
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw new Error(`Fetching error: ${error}`);
  }
};

export default fetchData;
