import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MoviesResponse } from 'src/app/model/movie';
import { TrailerRequest } from 'src/app/model/trailer';
import { Credit } from 'src/app/model/credit';
import { Person } from 'src/app/model/person';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  getMovieByIdRequest = "movie/";

  getMovieTrailerRequest = "/videos";

  getMovieCreditsRequest = "/credits";

  getTrendingMoviesRequest = "trending/movie/week";

  getPopularMoviesRequest = "movie/popular";

  getUpcomingMoviesRequest = "movie/upcoming";

  getMoviesWithGenreRequest = "discover/movie";

  private popularPage = 1;
  public popularLoading = false;

  private upcomingPage = 1;
  public upcomingLoading = false;

  private comedyPage = 1;
  public comedyLoading = false;

  private romancePage = 1;
  public romanceLoading = false;

  private dramaPage = 1;
  public dramaLoading = false;

  private misteryAndSuspensePage = 1;
  public misteryAndSuspenseLoading = false;

  private actionAndAdventurePage = 1;
  public actionAndAdventureLoading = false;

  private fantasyPage = 1;
  public fantasyLoading = false;

  private familyPage = 1;
  public familyLoading = false;

  private terrorPage = 1;
  public terrorLoading = false;

  private crimePage = 1;
  public crimeLoading = false;

  private documentaryPage = 1;
  public documentaryLoading = false;

  private scienceFictionPage = 1;
  public scienceFictionLoading = false;

  constructor(private http: HttpClient){
    
  }

  //Reseteo todas las páginas
  resetPages(){
    this.popularPage = 1;
    this.upcomingPage = 1;
    this.comedyPage = 1;
    this.romancePage = 1;
    this.dramaPage = 1;
    this.misteryAndSuspensePage = 1;
    this.actionAndAdventurePage = 1;
    this.fantasyPage = 1;
    this.familyPage = 1;
    this.terrorPage = 1;
    this.crimePage = 1;
    this.documentaryPage = 1;
    this.scienceFictionPage = 1;
  }

  //Movie by id
  getMovieById(id: string): Observable<Movie>{
    return this.http.get<Movie>(environment.apiUrl + this.getMovieByIdRequest + id + environment.api_key + environment.language).pipe(
      map((resp) =>{
        return resp;
    }));
  }

  //Movie trailer
  getMovieTrailer(id: string): Observable<string>{
    return this.http.get<TrailerRequest>(environment.apiUrl + this.getMovieByIdRequest + id + this.getMovieTrailerRequest + environment.api_key + environment.language).pipe(
      map((resp) =>{
        var trailerUrl = "";

        if(resp.results != null && resp.results.length > 0){
          resp.results!.forEach(trailer => {
            if(trailer.site == "YouTube" && trailer.type == "Trailer" && trailer.key != null){
              trailerUrl = environment.urlTrailerYouTube + trailer.key;
              return;
            }
          });
        }

        return trailerUrl;
    }));
  }

  //Movie cast
  getMovieCast(id: string): Observable<Person[]>{
    return this.http.get<Credit>(environment.apiUrl + this.getMovieByIdRequest + id + this.getMovieCreditsRequest + environment.api_key + environment.language).pipe(
      map((resp) =>{
        return resp.cast;
    }));
  }

  //Trending movies
  getTrendingMovies(): Observable<Movie[]>{
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getTrendingMoviesRequest + environment.api_key + environment.language + environment.region).pipe(map((resp) => resp.results));
  }
  
  //Popular movies
  getPopularMovies(): Observable<Movie[]>{
    if(this.popularLoading){
      return of([]);
    }

    this.popularLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + this.getPopularMoviesRequest + environment.api_key + environment.page + this.popularPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.popularPage += 1;
        this.popularLoading = false;
    }));
  }

  //Upcoming movies
  getUpcomingMovies(): Observable<Movie[]>{
    if(this.upcomingLoading){
      return of([]);
    }

    this.upcomingLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + this.getUpcomingMoviesRequest + environment.api_key + environment.page + this.upcomingPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.upcomingPage += 1;
        this.upcomingLoading = false;
    }));
  }

  //Comedy movies
  getMoviesWithComedyGenre(): Observable<Movie[]>{
    if(this.comedyLoading){
      return of([]);
    }

    this.comedyLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "35" + environment.page + this.comedyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.comedyPage += 1;
        this.comedyLoading = false;
    }));
  }

  //Romance movies
  getMoviesWithRomanceGenre(): Observable<Movie[]>{
    if(this.romanceLoading){
      return of([]);
    }

    this.romanceLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "10749" + environment.page + this.romancePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.romancePage += 1;
        this.romanceLoading = false;
    }));
  }

  //Drama movies
  getMoviesWithDramaGenre(): Observable<Movie[]>{
    if(this.dramaLoading){
      return of([]);
    }

    this.dramaLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "18" + environment.page + this.dramaPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.dramaPage += 1;
        this.dramaLoading = false;
    }));
  }
  
  //Mistery and suspense movies
  getMoviesWithMisteryAndSuspenseGenre(): Observable<Movie[]>{
    if(this.misteryAndSuspenseLoading){
      return of([]);
    }

    this.misteryAndSuspenseLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "9648%2C53" + environment.page + this.misteryAndSuspensePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.misteryAndSuspensePage += 1;
        this.misteryAndSuspenseLoading = false;
    }));
  }

  //Action and adventure movies
  getMoviesWithActionAndAdventureGenre(): Observable<Movie[]>{
    if(this.actionAndAdventureLoading){
      return of([]);
    }

    this.actionAndAdventureLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "28%2C12" + environment.page + this.actionAndAdventurePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.actionAndAdventurePage += 1;
        this.actionAndAdventureLoading = false;
    }));
  }

  //Fantasy movies
  getMoviesWithFantasyGenre(): Observable<Movie[]>{
    if(this.fantasyLoading){
      return of([]);
    }

    this.fantasyLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "14" + environment.page + this.fantasyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.fantasyPage += 1;
        this.fantasyLoading = false;
    }));
  }

  //Family movies
  getMoviesWithFamilyGenre(): Observable<Movie[]>{
    if(this.familyLoading){
      return of([]);
    }

    this.familyLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "10751" + environment.page + this.familyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.familyPage += 1;
        this.familyLoading = false;
    }));
  }

  //Terror movies
  getMoviesWithTerrorGenre(): Observable<Movie[]>{
    if(this.terrorLoading){
      return of([]);
    }

    this.terrorLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "27" + environment.page + this.terrorPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.terrorPage += 1;
        this.terrorLoading = false;
    }));
  }

  //Crime movies
  getMoviesWithCrimeGenre(): Observable<Movie[]>{
    if(this.crimeLoading){
      return of([]);
    }

    this.crimeLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "80" + environment.page + this.crimePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.crimePage += 1;
        this.crimeLoading = false;
    }));
  }

  //Documentary movies
  getMoviesWithDocumentaryGenre(): Observable<Movie[]>{
    if(this.documentaryLoading){
      return of([]);
    }

    this.documentaryLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key + environment.with_genres + "99" + environment.page + this.documentaryPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.documentaryPage += 1;
        this.documentaryLoading = false;
    }));
  }

  //Science fiction movies
  getMoviesWithScienceFictionGenre(): Observable<Movie[]>{
    if(this.scienceFictionLoading){
      return of([]);
    }

    this.scienceFictionLoading = true;
    
    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMoviesWithGenreRequest + environment.api_key  + environment.with_genres + "878" + environment.page + this.scienceFictionPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.scienceFictionPage += 1;
        this.scienceFictionLoading = false;
    }));
  }
}