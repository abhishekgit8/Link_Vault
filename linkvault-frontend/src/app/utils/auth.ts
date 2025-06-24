// Utility functions for handling JWT access/refresh token logic

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}, onAuthFail?: () => void): Promise<Response> {
  // Attach access token from localStorage
  const token = localStorage.getItem("token");
  if (!init.headers) init.headers = {};
  (init.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;

  let res = await fetch(input, init);
  if (res.status === 401) {
    // Try to refresh the access token
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const refreshRes = await fetch(`${backendUrl}/api/refresh`, {
      method: "POST",
      credentials: "include", // send cookies
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        // Retry original request with new token
        (init.headers as Record<string, string>)["Authorization"] = `Bearer ${data.access_token}`;
        res = await fetch(input, init);
      }
    } else {
      // Refresh failed: force logout
      localStorage.removeItem("token");
      if (onAuthFail) onAuthFail();
      return res;
    }
  }
  return res;
}
