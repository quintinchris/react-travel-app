const URL = 'http://localhost:8080';

export async function listEntries() {
    const response = await fetch(`${URL}/api/logs`);
    return response.json();
}

export async function createEntry(entry) {
    const response = await fetch(`${URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}