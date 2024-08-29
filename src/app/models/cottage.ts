export interface CottageInput {
    type:       string,
    price:      number,
    available:  number
}

export interface CottageInputResponse {
    message: string,
    data: any
}

export interface CottageListResponse {
    id: number,
    type: string,
    price: number,
    available: number,
    created_at: Date
}

export interface ResponseCottages {
    message: string,
    customers: {
        current_page: number,
        data: any[],
        first_current_ur: string,
        from: number,
        last_page: number,
        last_page_url: string,
        links: { url: string | null; label: string; active: boolean}[],
        next_page_url: string,
        path: string,
        per_page: number,
        prev_page_url: string,
        to: number,
        total: number
    },
    totalPages: number
}

export interface UpdateCottages {
    id: number,
    type: string,
    price: number,
    available: number
}
