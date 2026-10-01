export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors?: Record<string, string>,
  ) {
    super(message);
  }
}

/** Small typed wrapper around fetch used by every form and list in the app. */
export async function postJson<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError("Network error. Check your connection and try again.", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message ?? "Something went wrong. Please try again.", res.status, data.fieldErrors);
  }
  return data as T;
}

export async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError("Network error. Check your connection and try again.", 0);
  }
  if (!res.ok) throw new ApiError("Could not load data. Please try again.", res.status);
  return (await res.json()) as T;
}
