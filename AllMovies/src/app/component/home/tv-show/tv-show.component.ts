import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { TvShow } from 'src/app/model/tv-show';
import { TvShowService } from 'src/app/service/tv-show/tv-show.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})

export class TvShowComponent {

  trendingTvShows: TvShow[] = [];

  popularTvShowsTitle = "Lo más popular";
  popularTvShows: TvShow[] = [];

  comedyTvShowsTitle = "Comedia";
  comedyTvShows: TvShow[] = [];
  dramaTvShowsTitle = "Drama";
  dramaTvShows: TvShow[] = [];
  misteryTvShowsTitle = "Misterio";
  misteryTvShows: TvShow[] = [];
  actionAndAdventureTvShowsTitle = "Acción y aventuras";
  actionAndAdventureTvShows: TvShow[] = [];
  scienceFictionAndFantasyTvShowsTitle = "Ciencia ficción y fantasía";
  scienceFictionAndFantasyTvShows: TvShow[] = [];
  familyTvShowsTitle = "Para toda la familia";
  familyTvShows: TvShow[] = [];
  documentaryTvShowsTitle = "Documentales";
  documentaryTvShows: TvShow[] = [];
  realityTvShowsTitle = "Realitys";
  realityTvShows: TvShow[] = [];

  //Le pongo el título a la página
  constructor(private title:Title, public tvShowsService: TvShowService) {
    this.title.setTitle('Series - AllMovies');
   }

  //Hago todas las llamadas para mostrar todas las series cuando se ejecuta el componente
  ngOnInit(): void{
    this.getTrendingTvShows();

    this.getPopularTvShows();

    this.getComedyTvShows();
    this.getDramaTvShows();
    this.getMisteryTvShows();
    this.getActionAndAdventureTvShows();
    this.getScienceFictionAndFantasyTvShows();
    this.getFamilyTvShows();
    this.getDocumentaryTvShows();
    this.getRealityTvShows();
  }

  //Pongo el scroll de la ventana al principio y reseteo las páginas a 1 de todas las llamadas cuando se destruye el componente
  ngOnDestroy() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.tvShowsService.resetPages();
  }

  //Trending tv shows
  getTrendingTvShows(){
    this.tvShowsService.getTrendingTvShows().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.trendingTvShows = response;
    });
  }

  //Popular tv shows
  getPopularTvShows(){
    this.tvShowsService.getPopularTvShows().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.popularTvShows = response;
    });
  }

  paginationPopularTvShows() {
    if (this.tvShowsService.popularLoading) {
      return;
    }
        
    this.tvShowsService.getPopularTvShows().subscribe((tvShows) => {
      this.popularTvShows.push(...tvShows);
    });
  }

  //Comedy tv shows
  getComedyTvShows(){
    this.tvShowsService.getTvShowsWithComedyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.comedyTvShows = response;
    });
  }

  paginationComedyTvShows() {
    if (this.tvShowsService.comedyLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithComedyGenre().subscribe((tvShows) => {
      this.comedyTvShows.push(...tvShows);
    });
  }

  //Drama tv shows
  getDramaTvShows(){
    this.tvShowsService.getTvShowsWithDramaGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.dramaTvShows = response;
    });
  }

  paginationDramaTvShows() {
    if (this.tvShowsService.dramaLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithDramaGenre().subscribe((tvShows) => {
      this.dramaTvShows.push(...tvShows);
    });
  }

  //Mistery tv shows
  getMisteryTvShows(){
    this.tvShowsService.getTvShowsWithMisteryGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.misteryTvShows = response;
    });
  }

  paginationMisteryTvShows() {
    if (this.tvShowsService.misteryLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithMisteryGenre().subscribe((tvShows) => {
      this.misteryTvShows.push(...tvShows);
    });
  }

  //Action and adventure tv shows
  getActionAndAdventureTvShows(){
    this.tvShowsService.getTvShowsWithActionAndAdventureGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.actionAndAdventureTvShows = response;
    });
  }

  paginationActionAndAdventureTvShows() {
    if (this.tvShowsService.actionAndAdventureLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithActionAndAdventureGenre().subscribe((tvShows) => {
      this.actionAndAdventureTvShows.push(...tvShows);
    });
  }

  //Science fiction and fantasy tv shows
  getScienceFictionAndFantasyTvShows(){
    this.tvShowsService.getTvShowsWithScienceFictionAndFantasyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.scienceFictionAndFantasyTvShows = response;
    });
  }

  paginationScienceFictionAndFantasyTvShows() {
    if (this.tvShowsService.scienceFictionAndFantasyLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithScienceFictionAndFantasyGenre().subscribe((tvShows) => {
      this.scienceFictionAndFantasyTvShows.push(...tvShows);
    });
  }

  //Family tv shows
  getFamilyTvShows(){
    this.tvShowsService.getTvShowsWithFamilyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.familyTvShows = response;
    });
  }

  paginationFamilyTvShows() {
    if (this.tvShowsService.familyLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithFamilyGenre().subscribe((tvShows) => {
      this.familyTvShows.push(...tvShows);
    });
  }

  //Documentary tv shows
  getDocumentaryTvShows(){
    this.tvShowsService.getTvShowsWithDocumentaryGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.documentaryTvShows = response;
    });
  }

  paginationDocumentaryTvShows() {
    if (this.tvShowsService.documentaryLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithDocumentaryGenre().subscribe((tvShows) => {
      this.documentaryTvShows.push(...tvShows);
    });
  }

  //Reality tv shows
  getRealityTvShows(){
    this.tvShowsService.getTvShowsWithRealityGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.realityTvShows = response;
    });
  }

  paginationRealityTvShows() {
    if (this.tvShowsService.realityLoading) {
      return;
    }
        
    this.tvShowsService.getTvShowsWithRealityGenre().subscribe((tvShows) => {
      this.realityTvShows.push(...tvShows);
    });
  }
}
