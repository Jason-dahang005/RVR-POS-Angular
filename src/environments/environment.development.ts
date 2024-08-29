export interface Environment {
    production: boolean,
    apiLink: string
}

export const environment: Environment = {
    production: false,
    apiLink: 'http://127.0.0.1:8000/api/'
};
