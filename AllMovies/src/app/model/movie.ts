import { Genre } from "./genre";

export interface MoviesResponse{
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

export interface Movie{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: string;
    genres: Genre[];
}