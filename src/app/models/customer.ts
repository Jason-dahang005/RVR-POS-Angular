import { FormControl } from "@angular/forms";

export interface ResponseCustomers {
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

export interface CustomersInput {
    type: FormControl<string>
    rate: FormControl<number>
    description: FormControl<string>;
}

export interface InputResponse {
    message: string,
    data: any
}

export interface Customers {
    id: number,
    type: string,
    rate: number,
    description: string,
    created_at: Date
}

export interface UpdateCustomers {
    id: number,
    type: string,
    rate: number,
    description: string
}