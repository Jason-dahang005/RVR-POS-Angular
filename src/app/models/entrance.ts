export interface Entrance {
    id: number,
    name: string,
    total: number
}

export interface BookedCottage {
    cottage_id: number,
    entrance_id: number,
    quantity: number
}

export interface CustomersCount {
    cottage_id: number,
    customer_id: number,
    count: number
}

export interface createEntranceResponse {
    message: string,
    data: any
}