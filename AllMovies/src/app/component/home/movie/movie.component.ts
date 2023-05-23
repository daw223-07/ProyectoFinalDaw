import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent{

  trendingMovies: Movie[] = [];

  popularMoviesTitle = "Lo más popular";
  popularMovies: Movie[] = [];

  upcomingMoviesTitle = "Próximamente";
  upcomingMovies: Movie[] = [];

  comedyMoviesTitle = "Comedia";
  comedyMovies: Movie[] = [];
  romanceMoviesTitle = "Romance";
  romanceMovies: Movie[] = [];
  dramaMoviesTitle = "Drama";
  dramaMovies: Movie[] = [];
  misteryAndSuspenseMoviesTitle = "Misterio y suspense";
  misteryAndSuspenseMovies: Movie[] = [];
  actionAndAdventureMoviesTitle = "Acción y aventuras";
  actionAndAdventureMovies: Movie[] = [];
  fantasyMoviesTitle = "Fantasía";
  fantasyMovies: Movie[] = [];
  familyMoviesTitle = "Para toda la familia";
  familyMovies: Movie[] = [];
  terrorMoviesTitle = "Terror";
  terrorMovies: Movie[] = [];
  crimeMoviesTitle = "Crimen";
  crimeMovies: Movie[] = [];
  documentaryMoviesTitle = "Documentales";
  documentaryMovies: Movie[] = [];
  scienceFictionMoviesTitle = "Ciencia ficción";
  scienceFictionMovies: Movie[] = [];

  //Le pongo el título a la página
  constructor(private title:Title, public movieService: MovieService){
    this.title.setTitle('Películas - AllMovies');
  }

  //Hago todas las llamadas para mostrar todas las películas cuando se ejecuta el componente
  ngOnInit(): void{
    this.getTrendingMovies();

    this.getPopularMovies();

    this.getUpcomingMovies();

    this.getComedyMovies();
    this.getRomanceMovies();
    this.getDramaMovies();
    this.getMisteryAndSuspenseMovies();
    this.getActionAndAdventureMovies();
    this.getFantasyMovies();
    this.getFamilyMovies();
    this.getTerrorMovies();
    this.getCrimeMovies();
    this.getDocumentaryMovies();
    this.getScienceFictionMovies();
  }

  //Pongo el scroll de la ventana al principio y reseteo las páginas a 1 de todas las llamadas cuando se destruye el componente
  ngOnDestroy() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.movieService.resetPages();
  }

  //Trending movies
  getTrendingMovies(){
    this.movieService.getTrendingMovies().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.trendingMovies = response;
    });
   }

  //Popular movies
  getPopularMovies(){
    this.movieService.getPopularMovies().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.popularMovies = response;
    });
   }

  paginationPopularMovies() {
    if (this.movieService.popularLoading) {
      return;
    }
        
    this.movieService.getPopularMovies().subscribe((movies) => {
      this.popularMovies.push(...movies);
    });
  }

  //Upcoming movies
  getUpcomingMovies(){
    this.movieService.getUpcomingMovies().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.upcomingMovies = response;
    });
  }

  paginationUpcomingMovies() {
    if (this.movieService.upcomingLoading) {
      return;
    }
        
    this.movieService.getUpcomingMovies().subscribe((movies) => {
      this.upcomingMovies.push(...movies);
    });
  }

  //Comedy movies
  getComedyMovies(){
    this.movieService.getMoviesWithComedyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.comedyMovies = response;
    });
  }

  paginationComedyMovies() {
    if (this.movieService.comedyLoading) {
      return;
    }
        
    this.movieService.getMoviesWithComedyGenre().subscribe((movies) => {
      this.comedyMovies.push(...movies);
    });
  }

  //Romance movies
  getRomanceMovies(){
    this.movieService.getMoviesWithRomanceGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.romanceMovies = response;
    });
  }

  paginationRomanceMovies() {
    if (this.movieService.romanceLoading) {
      return;
    }
        
    this.movieService.getMoviesWithRomanceGenre().subscribe((movies) => {
      this.romanceMovies.push(...movies);
    });
  }

  //Drama movies
  getDramaMovies(){
    this.movieService.getMoviesWithDramaGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.dramaMovies = response;
    });
  }

  paginationDramaMovies() {
    if (this.movieService.dramaLoading) {
      return;
    }
        
    this.movieService.getMoviesWithDramaGenre().subscribe((movies) => {
      this.dramaMovies.push(...movies);
    });
  }

  //Mistery and suspense movies
  getMisteryAndSuspenseMovies(){ 
    this.movieService.getMoviesWithMisteryAndSuspenseGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.misteryAndSuspenseMovies = response;
    });
  }

  paginationMisteryAndSuspenseMovies() {
    if (this.movieService.misteryAndSuspenseLoading) {
      return;
    }
        
    this.movieService.getMoviesWithMisteryAndSuspenseGenre().subscribe((movies) => {
      this.misteryAndSuspenseMovies.push(...movies);
    });
  }

  //Action and adventure movies
  getActionAndAdventureMovies(){
    this.movieService.getMoviesWithActionAndAdventureGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.actionAndAdventureMovies = response;
    });
  }

  paginationActionAndAdventureMovies() {
    if (this.movieService.actionAndAdventureLoading) {
      return;
    }
        
    this.movieService.getMoviesWithActionAndAdventureGenre().subscribe((movies) => {
      this.actionAndAdventureMovies.push(...movies);
    });
  }

  //Fantasy movies
  getFantasyMovies(){
    this.movieService.getMoviesWithFantasyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.fantasyMovies = response;
    });
  }

  paginationFantasyMovies() {
    if (this.movieService.fantasyLoading) {
      return;
    }
        
    this.movieService.getMoviesWithFantasyGenre().subscribe((movies) => {
      this.fantasyMovies.push(...movies);
    });
  }

  //Family movies
  getFamilyMovies(){
    this.movieService.getMoviesWithFamilyGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.familyMovies = response;
    });
  }

  paginationFamilyMovies() {
    if (this.movieService.familyLoading) {
      return;
    }
        
    this.movieService.getMoviesWithFamilyGenre().subscribe((movies) => {
      this.familyMovies.push(...movies);
    });
  }

  //Terror movies
  getTerrorMovies(){
    this.movieService.getMoviesWithTerrorGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.terrorMovies = response;
    });
  }

  paginationTerrorMovies() {
    if (this.movieService.terrorLoading) {
      return;
    }
        
    this.movieService.getMoviesWithTerrorGenre().subscribe((movies) => {
      this.terrorMovies.push(...movies);
    });
  }

  //Crime movies
  getCrimeMovies(){
    this.movieService.getMoviesWithCrimeGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.crimeMovies = response;
    });
  }

  paginationCrimeMovies() {
    if (this.movieService.crimeLoading) {
      return;
    }
        
    this.movieService.getMoviesWithCrimeGenre().subscribe((movies) => {
      this.crimeMovies.push(...movies);
    });
  }

  //Documentary movies
  getDocumentaryMovies(){
    this.movieService.getMoviesWithDocumentaryGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.documentaryMovies = response;
    });
  }

  paginationDocumentaryMovies() {
    if (this.movieService.documentaryLoading) {
      return;
    }
        
    this.movieService.getMoviesWithDocumentaryGenre().subscribe((movies) => {
      this.documentaryMovies.push(...movies);
    });
  }

  //Science fiction movies
  getScienceFictionMovies(){
    this.movieService.getMoviesWithScienceFictionGenre().pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.scienceFictionMovies = response;
    });
  }

  paginationScienceFictionMovies() {
    if (this.movieService.scienceFictionLoading) {
      return;
    }
        
    this.movieService.getMoviesWithScienceFictionGenre().subscribe((movies) => {
      this.scienceFictionMovies.push(...movies);
    });
  }
}
