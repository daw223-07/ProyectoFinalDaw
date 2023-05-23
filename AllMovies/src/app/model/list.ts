import { Genre } from "./genre";

export interface ListsResponse{
    page: number;
    results: List[];
    total_results: number;
    total_pages: number;
}

export interface Item{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: string;
    genres: Genre[];
    name: string;
    first_air_date: string;
    last_air_date: string;
    status: string;
    number_of_seasons: number;
    media_type: string;
}

export interface List{
    id: number;
    name: string;
    list_type: string;
    poster_path: string;
    item_count: number;
    description: string;
    items: Item[];
}