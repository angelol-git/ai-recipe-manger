const backendUrl = "http://localhost:8080/api"

export async function sendCreateMessage(payload) {
    const res = await fetch(`${backendUrl}/ai/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to retrieve all recipes");
    }

    return res.json();
}
