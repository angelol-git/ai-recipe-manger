import API_BASE_URL from "../config/api.js";

const backendUrl = API_BASE_URL;

export async function fetchCurrentUser() {
    const res = await fetch(`${backendUrl}/auth/me`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to load user");
    }

    return res.json({ message: "Retrieved user data" });
}

export async function logoutUser() {
    const res = await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        console.error(`Failed to log out: ${res.error}`);
    }

    return res.json({ message: "User logged out" });
} 
