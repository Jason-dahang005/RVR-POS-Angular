import { CottageListResponse } from "./cottage";
import { Customers } from "./customer";

export interface entranceReponse{
    entrance: {
        data: Entrance[],
        current_page: number,
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
    totalPages: number,
}

export interface Entrance {
    id: number,
    name: string,
    total: number,
    booked_cottages: bookedCottageResponse[],
    customers_count: customersCountResponse[],
    created_at: Date
}
export interface bookedCottageResponse {
    entrance_id: number,
    cottage_id: number,
    quantity: number,
    cottage: CottageListResponse
}

export interface customersCountResponse {
    cottage_id: number,
    customer_id: number,
    count: number,
    customer: Customers
}

export interface createEntranceResponse {
    message: string,
    data: any
}

export interface addEntranceDetails {
    id: number,
    name: string
}