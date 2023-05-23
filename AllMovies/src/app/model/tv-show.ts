import { Genre } from "./genre";

export interface TvShowResponse{
    page: number;
    results: TvShow[];
    total_results: number;
    total_pages: number;
}

export interface TvShow{
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    first_air_date: string;
    last_air_date: string;
    status: string;
    number_of_seasons: number;
    vote_average: string;
    genres: Genre[];
}