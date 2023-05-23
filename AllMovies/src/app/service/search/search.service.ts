import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Movie, MoviesResponse } from 'src/app/model/movie';
import { Person, PersonResponse } from 'src/app/model/person';
import { TvShow, TvShowResponse } from 'src/app/model/tv-show';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  getMovieSearhRequest = "search/movie";

  getTvShowSearhRequest = "search/tv";

  getPersonSearhRequest = "search/person";

  private searchMoviePage = 1;
  public searchMovieLoading = false;

  private searchTvShowPage = 1;
  public searchTvShowLoading = false;

  private searchPersonPage = 1;
  public searchPersonLoading = false;

  constructor(private http: HttpClient){
    
  }

  //Compruebo si la query que se manda tiene espacios, si los tiene los reemplazo por '%20' para ponerlo en la url
  getQuery(query: string): string{
    var queryOk = "";

    if(query.includes(" ")){
      let queryArray = query.split(" ");

      queryArray.forEach(q => {
        queryOk = queryOk + q + "%20";
      });

    } else{
      queryOk = query
    }

    return queryOk;
  }

  //Reseteo todas las páginas
  resetPages(){
    this.searchMoviePage = 1;
    this.searchTvShowPage = 1;
    this.searchPersonPage = 1;
  }

  //Search movies
  getMoviesSearch(query: string): Observable<Movie[]>{
    if(this.searchMovieLoading){
      return of([]);
    }

    this.searchMovieLoading = true;

    return this.http.get<MoviesResponse>(environment.apiUrl + this.getMovieSearhRequest + environment.api_key + environment.language + environment.query + this.getQuery(query) + environment.page + this.searchMoviePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.searchMoviePage += 1;
        this.searchMovieLoading = false;
    }));
  }

  //Search tv shows
  getTvShowsSearch(query: string): Observable<TvShow[]>{
    if(this.searchTvShowLoading){
      return of([]);
    }

    this.searchTvShowLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowSearhRequest + environment.api_key + environment.language + environment.query + this.getQuery(query) + environment.page + this.searchTvShowPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.searchTvShowPage += 1;
        this.searchTvShowLoading = false;
    }));
  }

  //Search people
  getPeopleSearch(query: string): Observable<Person[]>{
    if(this.searchPersonLoading){
      return of([]);
    }

    this.searchPersonLoading = true;
    
    return this.http.get<PersonResponse>(environment.apiUrl + this.getPersonSearhRequest + environment.api_key + environment.language + environment.query + this.getQuery(query) + environment.page + this.searchPersonPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.searchPersonPage += 1;
        this.searchPersonLoading = false;
    }));
  }
}
