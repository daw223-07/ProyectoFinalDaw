import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvShow, TvShowResponse } from 'src/app/model/tv-show';
import { TrailerRequest } from 'src/app/model/trailer';
import { Person } from 'src/app/model/person';
import { Credit } from 'src/app/model/credit';

@Injectable({
  providedIn: 'root'
})

export class TvShowService {

  getTvShowByIdRequest = "tv/";

  getTvShowTrailerRequest = "/videos";

  getTvShowCreditsRequest = "/credits";

  getTrendingTvShowRequest = "trending/tv/week";

  getPopularTvShowRequest = "tv/popular";

  getTvShowsWithGenreRequest = "discover/tv";

  private popularPage = 1;
  public popularLoading = false;

  private comedyPage = 1;
  public comedyLoading = false;

  private dramaPage = 1;
  public dramaLoading = false;

  private misteryPage = 1;
  public misteryLoading = false;

  private actionAndAdventurePage = 1;
  public actionAndAdventureLoading = false;

  private scienceFictionAndFantasyPage = 1;
  public scienceFictionAndFantasyLoading = false;

  private familyPage = 1;
  public familyLoading = false;

  private documentaryPage = 1;
  public documentaryLoading = false;

  private realityPage = 1;
  public realityLoading = false;

  constructor(private http: HttpClient){
    
  }

  //Reseteo todas las páginas
  resetPages(){
    this.popularPage = 1;
    this.comedyPage = 1;
    this.dramaPage = 1;
    this.misteryPage = 1;
    this.actionAndAdventurePage = 1;
    this.scienceFictionAndFantasyPage = 1;
    this.familyPage = 1;
    this.documentaryPage = 1;
    this.realityPage = 1;
  }

  //Tv show by id
  getTvShowById(id: string): Observable<TvShow>{
    return this.http.get<TvShow>(environment.apiUrl + this.getTvShowByIdRequest + id + environment.api_key + environment.language).pipe(
      map((resp) =>{
        return resp;
    }));
  }

  //Tv show trailer
  getTvShowTrailer(id: string): Observable<string>{
    return this.http.get<TrailerRequest>(environment.apiUrl + this.getTvShowByIdRequest + id + this.getTvShowTrailerRequest + environment.api_key + environment.language).pipe(
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

  //Tv show cast
  getTvShowCast(id: string): Observable<Person[]>{
    return this.http.get<Credit>(environment.apiUrl + this.getTvShowByIdRequest + id + this.getTvShowCreditsRequest + environment.api_key + environment.language).pipe(
      map((resp) =>{
        return resp.cast;
    }));
  }

  //Trending tv shows
  getTrendingTvShows(): Observable<TvShow[]>{
    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTrendingTvShowRequest + environment.api_key + environment.language + environment.region).pipe(map((resp) => resp.results));
  }

  //Popular tv shows
  getPopularTvShows(): Observable<TvShow[]>{
    if(this.popularLoading){
      return of([]);
    }

    this.popularLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getPopularTvShowRequest + environment.api_key + environment.page + this.popularPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.popularPage += 1;
        this.popularLoading = false;
    }));
  }

  //Comedy tv shows
  getTvShowsWithComedyGenre(): Observable<TvShow[]>{
    if(this.comedyLoading){
      return of([]);
    }

    this.comedyLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "35" + environment.page + this.comedyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.comedyPage += 1;
        this.comedyLoading = false;
    }));
  }

  //Drama tv shows
  getTvShowsWithDramaGenre(): Observable<TvShow[]>{
    if(this.dramaLoading){
      return of([]);
    }

    this.dramaLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "18" + environment.page + this.dramaPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.dramaPage += 1;
        this.dramaLoading = false;
    }));
  }

  //Mistery tv shows
  getTvShowsWithMisteryGenre(): Observable<TvShow[]>{
    if(this.misteryLoading){
      return of([]);
    }

    this.misteryLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "9648" + environment.page + this.misteryPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.misteryPage += 1;
        this.misteryLoading = false;
    }));
  }

  //Action and adventure tv shows
  getTvShowsWithActionAndAdventureGenre(): Observable<TvShow[]>{
    if(this.actionAndAdventureLoading){
      return of([]);
    }

    this.actionAndAdventureLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "10759" + environment.page + this.actionAndAdventurePage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.actionAndAdventurePage += 1;
        this.actionAndAdventureLoading = false;
    }));
  }

  //Science fiction and fantasy tv shows
  getTvShowsWithScienceFictionAndFantasyGenre(): Observable<TvShow[]>{
    if(this.scienceFictionAndFantasyLoading){
      return of([]);
    }

    this.scienceFictionAndFantasyLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "10765" + environment.page + this.scienceFictionAndFantasyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.scienceFictionAndFantasyPage += 1;
        this.scienceFictionAndFantasyLoading = false;
    }));
  }

  //Family tv shows
  getTvShowsWithFamilyGenre(): Observable<TvShow[]>{
    if(this.familyLoading){
      return of([]);
    }

    this.familyLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "10751" + environment.page + this.familyPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.familyPage += 1;
        this.familyLoading = false;
    }));
  }

  //Documentary tv shows
  getTvShowsWithDocumentaryGenre(): Observable<TvShow[]>{
    if(this.documentaryLoading){
      return of([]);
    }

    this.documentaryLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "99" + environment.page + this.documentaryPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.documentaryPage += 1;
        this.documentaryLoading = false;
    }));
  }

  //Reality tv shows
  getTvShowsWithRealityGenre(): Observable<TvShow[]>{
    if(this.realityLoading){
      return of([]);
    }

    this.realityLoading = true;

    return this.http.get<TvShowResponse>(environment.apiUrl + this.getTvShowsWithGenreRequest + environment.api_key + environment.with_genres + "10764" + environment.page + this.realityPage.toString()).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.realityPage += 1;
        this.realityLoading = false;
    }));
  }
}