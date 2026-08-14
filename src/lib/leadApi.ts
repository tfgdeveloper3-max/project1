export interface LeadPayload {
    name: string;
    email: string;
    phone_number: string;
    message: string;
}

export interface LeadResponse {
    success?: boolean;
    [key: string]: unknown;
}

const LEAD_API_URL = "https://leads.authorpublishers.us/api/lead/luCkrTeO3XOxt8pehvLkRTDOG3O2D1wy";

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
    const res = await fetch(LEAD_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
}