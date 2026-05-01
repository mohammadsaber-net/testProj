export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // timeout 8s

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res;

  } catch (err) {
    if (retries === 0) {
      throw err;
    }
    await new Promise((resolve) => setTimeout(resolve, delay * (4 - retries)));
    return fetchWithRetry(url, options, retries - 1, delay);
  }
}