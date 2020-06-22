const URL = 'http://localhost:8080';

export async function listEntries() {
    const response = await fetch(`${URL}/api/logs`);
    return response.json();
}