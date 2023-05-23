export interface TrailerRequest{
    id: string;
    results: Trailer[];
}

export interface Trailer{
    name: string;
    key: string;
    site: string;
    type: string;
    official: boolean;
}