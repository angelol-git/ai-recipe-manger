import API_BASE_URL from "../config/api.js";

const backendUrl = `${API_BASE_URL}/chat`;

export async function sendCreateMessage(payload) {
  const res = await fetch(`${backendUrl}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json();
    throw data;
  }

  return res.json();
}
