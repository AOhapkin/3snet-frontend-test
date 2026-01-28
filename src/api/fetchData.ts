import type { ApiResponse } from "./types";

export async function fetchApiData(): Promise<ApiResponse> {
  const res = await fetch("https://3snet.co/js_test/api.json", {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as ApiResponse;
}