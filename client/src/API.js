const URL = 'https://trvl-log.web.app';

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