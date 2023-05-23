import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { Person } from 'src/app/model/person';
import { TvShow } from 'src/app/model/tv-show';
import { SearchService } from 'src/app/service/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  itemNameInput: string = "";

  moviesTitle: string = "Películas";
  movies: Movie[] = [];

  tvShowsTitle: string = "Series";
  tvShows: TvShow[] = [];

  peopleTitle: string = "Actores y directores";
  people: Person[] = [];

  emptyInputBool: boolean = false;

  noResultsBool: boolean = false;

  //Le pongo el título a la página
  constructor(private title:Title, private searchService: SearchService) {
    this.title.setTitle('Buscador - AllMovies');
  }

  ngOnInit(): void{
    
  }

  //Pongo el scroll de la ventana al principio y reseteo las páginas a 1 de todas las llamadas cuando se destruye el componente
  ngOnDestroy() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.searchService.resetPages();
  }

  //Si el input está vacío aparece un alert informando al usuario, si no, reseteo las páginas y vacío los arrays para hacer las llamadas
  submitSearchForm(){
    if(this.itemNameInput.trim() == ""){
      this.emptyInputBool = true;

      return;

    } else{
      this.emptyInputBool = false;
      this.noResultsBool = false;

      this.searchService.resetPages();
      
      this.movies = [];
      this.tvShows = [];
      this.people = [];

      this.getSearchMovies();
      this.getSearchTvShows();
      this.getSearchPeople();
    }    
  }

  checkResults(){
    if(this.movies.length == 0 && this.tvShows.length == 0 && this.people.length == 0){
      this.noResultsBool = true;

      return;
    }
  }

  //Search movies
  getSearchMovies(){
    this.searchService.getMoviesSearch(this.itemNameInput).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.movies = response;
    });
  }

  paginationSearchMovies() {
    if (this.searchService.searchMovieLoading) {
      return;
    }
        
    this.searchService.getMoviesSearch(this.itemNameInput).subscribe((movies) => {
      this.movies.push(...movies);
    });
  }

  //Search tv shows
  getSearchTvShows(){
    this.searchService.getTvShowsSearch(this.itemNameInput).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.tvShows = response;
    });
  }

  paginationSearchTvShows() {
    if (this.searchService.searchTvShowLoading) {
      return;
    }
        
    this.searchService.getTvShowsSearch(this.itemNameInput).subscribe((tvShows) => {
      this.tvShows.push(...tvShows);
    });
  }

  //Search people
  getSearchPeople(){
    this.searchService.getPeopleSearch(this.itemNameInput).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.people = response;

      this.checkResults();
    });
  }

  paginationSearchPeople() {
    if (this.searchService.searchPersonLoading) {
      return;
    }
        
    this.searchService.getPeopleSearch(this.itemNameInput).subscribe((people) => {
      this.people.push(...people);
    });
  }
}
