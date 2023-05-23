export interface AvatarPath{
    avatar_path: string;
}

export interface Tmdb{
    tmdb: AvatarPath;
}

export interface User{
    id: number;
    name: string;
    avatar: Tmdb;
    username: string;
}

export interface RatedValue{
    value: string;
}

export interface AccountState{
    id: string;
    favorite: boolean;
    rated: RatedValue;
    watchlist: boolean;
}