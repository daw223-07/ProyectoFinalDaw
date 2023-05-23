import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountState, User } from 'src/app/model/user';
import { Movie, MoviesResponse } from 'src/app/model/movie';
import { List, ListsResponse } from 'src/app/model/list';
import { TvShow, TvShowResponse } from 'src/app/model/tv-show';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getRequest_tokenRequest = "authentication/token/new";

  postSessionWithLoginRequest = "authentication/token/validate_with_login";

  postSession_idRequest = "authentication/session/new";

  getAccountStatesMovieRequest = "movie/";

  getAccountStatesTvShowRequest = "tv/";

  getAccountStatesRequest = "/account_states";

  postAddRemoveToFavoritesRequest = "/favorite";

  postAddRemoveToRatedRequest = "/rating";

  getUserDetailsRequest = "account";

  getListByIdRequest = "list/";

  getListsRequest = "/lists";

  postListRequest = "list";

  postAddToListRequest = "/add_item";

  getItemStatusFromListRequest = "/item_status";

  postClearListRequest = "/clear";

  postRemoveItemFromRequest = "/remove_item";

  getFavoriteMoviesRequest = "/favorite/movies";
  getFavoriteTvShowsRequest = "/favorite/tv";

  getRatedMoviesRequest = "/rated/movies";
  getRatedTvShowsRequest = "/rated/tv";

  deleteSessionRequest = "authentication/session";

  headers = new HttpHeaders();

  public numberOfLists: number = 0;

  private favoriteMoviesPage: number = 1;
  public favoriteMoviesLoading: boolean = false;
  public numberOfFavoriteMovies: number = 0;
  private favoriteTvShowsPage: number = 1;
  public favoriteTvShowsLoading: boolean = false;
  public numberOfFavoriteTvShows: number = 0;

  private ratedMoviesPage: number = 1;
  public ratedMoviesLoading: boolean = false;
  public numberOfRatedMovies: number = 0;
  private ratedTvShowsPage: number = 1;
  public ratedTvShowsLoading: boolean = false;
  public numberOfRatedTvShows: number = 0;

  constructor(private http: HttpClient){
    this.headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  }

  //Reseteo todas las páginas
  resetPages(){
    this.favoriteMoviesPage = 1;
    this.favoriteTvShowsPage = 1;
    this.ratedMoviesPage = 1;
    this.ratedTvShowsPage = 1;
  }

  //User details
  getUserDetails(session_id: string): Observable<User>{
    return this.http.get<User>(environment.apiUrl + this.getUserDetailsRequest + environment.api_key + environment.session_id + session_id).pipe(
      map((resp) =>{
        return resp;
    }));;
  }

  //Create session_id
  createSessionId(request_token: string): Observable<any>{
    const body = {};
    
    var httpParams = new HttpParams().append("request_token", request_token);

    return this.http.post(environment.apiUrl + this.postSession_idRequest + environment.api_key, body, { headers: this.headers, params: httpParams });
  }

  //Create session
  createSessionWithLogin(username: string, password: string, request_token: string): Observable<any>{
    const body = {};
    
    var httpParams = new HttpParams().append("username", username).append("password", password).append("request_token", request_token);

    return this.http.post(environment.apiUrl + this.postSessionWithLoginRequest + environment.api_key, body, { headers: this.headers, params: httpParams });
  }
  
  //Create token
  getRequestToken(): Observable<any>{
    return this.http.get(environment.apiUrl + this.getRequest_tokenRequest + environment.api_key);
  }

  //Account states movie
  getAccountStatesMovie(id: string, session_id: string){
    return this.http.get<AccountState>(environment.apiUrl + this.getAccountStatesMovieRequest + id + this.getAccountStatesRequest + environment.api_key + environment.session_id + session_id).pipe(
      map((resp) => {
        return resp;
    }));
  }

  //Account states tv show
  getAccountStatesTvShow(id: string, session_id: string){
    return this.http.get<AccountState>(environment.apiUrl + this.getAccountStatesTvShowRequest + id + this.getAccountStatesRequest + environment.api_key + environment.session_id + session_id).pipe(
      map((resp) => {
        return resp;
    }));
  }

  //Add or remove item of favorites
  addRemoveToFavorites(id: string, media_type: string, media_id: string, favorite: boolean, session_id: string){
    const body = {
      "media_type": media_type,
      "media_id": media_id,
      "favorite": favorite
    };

    return this.http.post(environment.apiUrl + this.getUserDetailsRequest + "/" + id + this.postAddRemoveToFavoritesRequest + environment.api_key + environment.session_id + session_id, body);
  }

  //Add movie of rateds
  addMovieRated(id: string, value: string, session_id: string){
    const body = {
      "value": value
    };

    return this.http.post(environment.apiUrl + this.getAccountStatesMovieRequest + id + this.postAddRemoveToRatedRequest + environment.api_key + environment.session_id + session_id, body);
  }

  //Remove movie of rateds
  removeMovieRated(id: string, session_id: string){
    return this.http.delete(environment.apiUrl + this.getAccountStatesMovieRequest + id + this.postAddRemoveToRatedRequest + environment.api_key + environment.session_id + session_id);
  }

  //Add tv show of rateds
  addTvShowRated(id: string, value: string, session_id: string){
    const body = {
      "value": value
    };
  
    return this.http.post(environment.apiUrl + this.getAccountStatesTvShowRequest + id + this.postAddRemoveToRatedRequest + environment.api_key + environment.session_id + session_id, body);
  }

  //Remove tv show of rateds
  removeTvShowRated(id: string, session_id: string){
    return this.http.delete(environment.apiUrl + this.getAccountStatesTvShowRequest + id + this.postAddRemoveToRatedRequest + environment.api_key + environment.session_id + session_id);
  }

  //List by id
  getListById(id: string, session_id: string): Observable<List>{
    return this.http.get<List>(environment.apiUrl + this.getListByIdRequest + id + environment.api_key + environment.session_id + session_id + environment.language).pipe(
      map((resp) =>{
        
        return resp;
    }));
  }

  //Lists
  getUserLists(userId: string, session_id: string): Observable<List[]>{
    return this.http.get<ListsResponse>(environment.apiUrl + environment.account + userId + this.getListsRequest + environment.api_key + environment.session_id + session_id).pipe(
      map((resp) => {
        this.numberOfLists = resp.total_results;

        return resp.results;
      }));
  }

  //Add list
  addList(name: string, description: string, session_id: string){
    const body = {
      "name": name,
      "description": description,
      "language": "es"
    };
  
    return this.http.post(environment.apiUrl + this.postListRequest + environment.api_key + environment.session_id + session_id, body);
  }

  //Add movie to list
  addMovieToList(idList: string, movie_id: string, session_id: string){
    const body = {
      "media_id": movie_id
    };
  
    return this.http.post(environment.apiUrl + this.postListRequest + "/" + idList + this.postAddToListRequest + environment.api_key + environment.session_id + session_id, body);
  }

  //Item status from list
  itemStatusFromList(idList: string, movie_id: string, session_id: string): Observable<any>{
    return this.http.get(environment.apiUrl + this.postListRequest + "/" + idList + this.getItemStatusFromListRequest + environment.api_key + environment.session_id + session_id + environment.language + environment.movie_id + movie_id).pipe(
      map((resp) => {
        return resp;
      }));
  }

  //Delete list
  deleteList(id: string, session_id: string): Observable<any>{
    return this.http.delete(environment.apiUrl + this.getListByIdRequest + id + environment.api_key + environment.session_id + session_id).pipe(
      map((resp) =>{
        
        return resp;
    }));
  }
  
  //Clear list
  clearList(id: string, session_id: string): Observable<any>{
    const body = {};

    return this.http.post(environment.apiUrl + this.getListByIdRequest + id + this.postClearListRequest + environment.api_key + environment.session_id + session_id + environment.confirm + "true", body).pipe(
      map((resp) =>{
        
        return resp;
    }));
  }

  //Delete movie from list
  deleteItemFromList(id: string, movie_id: string, session_id: string): Observable<any>{
    const body = {
      "media_id": movie_id
    };

    return this.http.post(environment.apiUrl + this.getListByIdRequest + id + this.postRemoveItemFromRequest + environment.api_key + environment.session_id + session_id, body).pipe(
      map((resp) =>{
        
        return resp;
    }));
  }

  //Favorite movies
  getUserFavoriteMovies(userId: string, session_id: string): Observable<Movie[]>{
    if(this.favoriteMoviesLoading){
      return of([]);
    }

    this.favoriteMoviesLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + environment.account + userId + this.getFavoriteMoviesRequest + environment.api_key + environment.session_id + session_id + environment.page + this.favoriteMoviesPage.toString()).pipe(
      map((resp) => {
        this.numberOfFavoriteMovies = resp.total_results;
        
        return resp.results;
      }),
      tap(() => {
        this.favoriteMoviesPage += 1;
        this.favoriteMoviesLoading = false;
    }));
  }

  //Favorite tv shows
  getUserFavoriteTvShows(userId: string, session_id: string): Observable<TvShow[]>{
    if(this.favoriteTvShowsLoading){
      return of([]);
    }

    this.favoriteTvShowsLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + environment.account + userId + this.getFavoriteTvShowsRequest + environment.api_key + environment.session_id + session_id + environment.page + this.favoriteTvShowsPage.toString()).pipe(
      map((resp) => {
        this.numberOfFavoriteTvShows = resp.total_results;
        
        return resp.results;
      }),
      tap(() => {
        this.favoriteTvShowsPage += 1;
        this.favoriteTvShowsLoading = false;
    }));
  }

  //Rated movies
  getUserRatedMovies(userId: string, session_id: string): Observable<Movie[]>{
    if(this.ratedMoviesLoading){
      return of([]);
    }

    this.ratedMoviesLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + environment.account + userId + this.getRatedMoviesRequest + environment.api_key + environment.session_id + session_id + environment.page + this.ratedMoviesPage.toString()).pipe(
      map((resp) => {
        this.numberOfRatedMovies = resp.total_results;
        
        return resp.results;
      }),
      tap(() => {
        this.ratedMoviesPage += 1;
        this.ratedMoviesLoading = false;
    }));
  }

  //Rated tv shows
  getUserRatedTvShows(userId: string, session_id: string): Observable<TvShow[]>{
    if(this.ratedTvShowsLoading){
      return of([]);
    }

    this.ratedTvShowsLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + environment.account + userId + this.getRatedTvShowsRequest + environment.api_key + environment.session_id + session_id + environment.page + this.ratedTvShowsPage.toString()).pipe(
      map((resp) => {
        this.numberOfRatedTvShows = resp.total_results;
        
        return resp.results;
      }),
      tap(() => {
        this.ratedTvShowsPage += 1;
        this.ratedTvShowsLoading = false;
    }));
  }

  //Logout
  deleteSession(session_id: string): Observable<any>{
    const body = {
      "session_id": session_id
    };

    return this.http.delete(environment.apiUrl + this.deleteSessionRequest + environment.api_key, { headers: this.headers, body: body });
  }
}
