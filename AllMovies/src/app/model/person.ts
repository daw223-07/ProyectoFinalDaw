import { Item } from "./list";

export interface PersonResponse{
    page: number;
    results: Person[];
    total_results: number;
    total_pages: number;
}

export interface Person{
    id: number;
    name: string;
    profile_path: string;
    biography: string;
    birthday: string;
    deathday: string;
    place_of_birth: string;
    known_for: Item[];
}