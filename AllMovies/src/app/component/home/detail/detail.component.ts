import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { TvShow } from 'src/app/model/tv-show';
import { Person } from 'src/app/model/person';
import { List, Item } from 'src/app/model/list';
import { MovieService } from 'src/app/service/movie/movie.service';
import { PersonService } from 'src/app/service/person/person.service';
import { TvShowService } from 'src/app/service/tv-show/tv-show.service';
import { UserService } from 'src/app/service/user/user.service';
import { Subscription, catchError, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from 'src/app/model/genre';
import { SearchService } from 'src/app/service/search/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {

  public subscriber!: Subscription;

  typeOfItem: string = "";

  idItem: string = "";

  srcImage: string = environment.srcImage;;

  id_session: string = localStorage.getItem("session_id") || "";
  userId: string = localStorage.getItem("userId") || "";

  movie!: Movie;
  movieCast: Person[] = [];

  tvShow!: TvShow;
  tvShowCast: Person[] = [];

  castTitle: string = "Reparto";

  person!: Person;
  personKnownForItems: Item[] = [];
  personMovies: Movie[] = [];
  personTvShows: TvShow[] = [];

  knownForMoviesTitle: string = "Películas";
  knownForTvShowsTitle: string = "Series";

  list!: List;
  listItems: Item[] = [];

  srcImageAddToList: string = "../../../../assets/image/addToList.png";

  genres: Genre[] = [];

  itemImage: string = "";
  itemTitle: string = "";
  itemVoteAverage: string = "";
  maxVote: string = "/10";
  itemDates: string = "";
  genresTitle: string = "Géneros: ";
  itemGenres: string = "";
  itemSubtitle: string = "";
  itemDescription: string = "";
  itemTrailer: string = "";

  itemFavorite: boolean = false;
  srcImageFavorite: string = "../../../../assets/image/favorite.png";

  itemRated: string = "";
  srcImageRated: string = "../../../../assets/image/star.png";

  toast: any;

  //Le pongo el título inicial a la página y creo un toast que utilizaré más adelante
  constructor(private title: Title, private activatedRoute: ActivatedRoute, private router: Router, public movieService: MovieService, public tvShowService: TvShowService, public personService: PersonService, public userService: UserService, public searchService: SearchService, private meta: Meta){
    this.title.setTitle('Detalle - AllMovies');

    this.toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }});
  }

  //Cojo los parámetros de la ruta para comprobar si es película, serie, persona o lista y llamar a un método u otro
  //También me subscribo al router events (que es el que me mandará los eventos cada vez que se inicie la navegación) y filtro que solo me mande cuando termina de navegar NavigationEnd
  ngOnInit(){
    let paramTypeOfItem = this.activatedRoute.snapshot.paramMap.get('typeOfItem');
    let paramIdItem = this.activatedRoute.snapshot.paramMap.get('id');

    this.typeOfItem = paramTypeOfItem || "";
    this.idItem = paramIdItem || "";

    switch(this.typeOfItem){
      case "pelicula":
        this.getMovieDetails();

        break;

      case "serie":
        this.getTvShowDetails();

        break;

      case "persona":
        this.getPersonDetails();

        break;

      case "lista":
        this.getListDetails();

        break;

      default:
        break;
    }

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)

    ).subscribe((event) => {
      window.location.reload();

      return;
    });
  }

  //Pongo el scroll de la ventana al principio cuando se destruye el componente
  //También valido si mi subscriber sigue activo y me desuscribo
  ngOnDestroy() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.subscriber?.unsubscribe();
  }

  //Función para cambiar el formato de la fecha
  formatDate(date: string): string{
    var dateArray = date.split("-");
    var dateFormated = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];

    return dateFormated;
  }

  //Cojo el array de géneros y lo convierto en string
  getGenres(genres: Genre[]): string{
    var genresText = "";

    genres.forEach(genre => {
      genresText += genre.name + ", ";
    });

    genresText = genresText.substring(0, genresText.length - 2);

    return genresText;
  }

  //Compruebo de que tipo es el item para enviarle movie o tv, y depende de si el item es o no favorito se añade o se elimina de favoritos
  addRemoveFavorite(){
    var media_type = "";

    switch(this.typeOfItem){
      case "pelicula":
        media_type = "movie";
        break;

      case "serie":
        media_type = "tv";
        break;

      default:
        break;
    }

    if(!this.itemFavorite){
      this.addFavorite(media_type);

    } else{
      this.removeFavorite(media_type);
    }
  }

  addFavorite(media_type: string){
    this.userService.addRemoveToFavorites(this.userId, media_type, this.idItem, !this.itemFavorite, this.id_session).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.itemFavorite = !this.itemFavorite;
      
      this.srcImageFavorite = "../../../../assets/image/favoriteFill.png";

      this.toast.fire({
        icon: 'success',
        title: '¡Ahora está en tu lista de favoritos!'});
    });
  }

  removeFavorite(media_type: string){
    Swal.fire({
      title: '¿Seguro que quieres eliminarlo de favoritos?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"

    }).then((result) => {
      if(result.isConfirmed){
        this.userService.addRemoveToFavorites(this.userId, media_type, this.idItem, !this.itemFavorite, this.id_session).pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(response => {
          this.itemFavorite = !this.itemFavorite;

          this.srcImageFavorite = "../../../../assets/image/favorite.png";
    
          this.toast.fire({
            icon: 'success',
            title: '¡Eliminado de favoritos!'});
        });
      }
    });
  }

  //Depende del tipo de item que se va a añadir a valoraciones llamo a un método u otro
  addRemoveRated(){
    switch(this.typeOfItem){
      case "pelicula":
        this.addRemoveMovieRated();
        break;

      case "serie":
        this.addRemoveTvShowRated();
        break;

      default:
        break;
    }
  }

  //Alert para añadir valoración
  async showRatingInputAlert(): Promise<number | null>{
    const result = await Swal.fire({
      title: 'Introduce tu valoración',
      input: 'number',
      confirmButtonColor: "#00b2e5",
      showCancelButton: true,
      allowOutsideClick: true,

      inputValidator: (value) => {
        if(!value){
          return 'Debes rellenar el campo';

        } else if(Number(value) <= 0 || Number(value) > 10){
          return 'La valoración debe ser entre 0 y 10';
        }

        return null;
      }
    });
  
    if (result.dismiss === Swal.DismissReason.cancel){
      return null;
    } 
  
    return result.value ? +result.value : null;
  }
  
  //Alert para confirmar que quiere borrar la valoración
  showRemoveRatingConfirmation(): Promise<any>{
    return Swal.fire({
      title: '¿Seguro que quieres eliminar tu valoración?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"
    });
  }
  
  //En cada método hago la llamada correspondiente para coger el item y darle valor a las variables que utilizo en el html, y cambiar el título de la página
  //Movie details
  getMovieDetails(){
    this.movieService.getMovieById(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.movie = response;

      this.itemImage = this.movie.poster_path == null ? "../../../assets/image/noImageGrid-Horizontal.jpg" : this.srcImage + this.movie.poster_path;
      this.itemTitle = this.movie.title == null ? "" : this.movie.title;
      this.itemVoteAverage = this.movie.vote_average == null ? "" : this.movie.vote_average;
      this.itemSubtitle = "";
      this.itemDates = this.movie.release_date == null || this.movie.release_date == "" ? "" : this.formatDate(this.movie.release_date);
      this.itemGenres = (this.movie.genres == null || this.movie.genres.length == 0) ? "" : this.getGenres(this.movie.genres);
      this.itemDescription = this.movie.overview == null ? "" : this.movie.overview;

      this.title.setTitle((this.movie.title != null ? this.movie.title : "Detalle película") + " - AllMovies");

      this.getMovieTrailer();
      this.getMovieCast();
      this.getAccountStatesMovie();
    });
  }

  getMovieTrailer(){
    this.movieService.getMovieTrailer(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.itemTrailer = response;
    });
  }

  getMovieCast(){
    this.movieService.getMovieCast(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.movieCast = response;
    });
  }

  getAccountStatesMovie(){
    this.userService.getAccountStatesMovie(this.idItem, this.id_session).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      if(response.favorite == true){
        this.itemFavorite = true;
        this.srcImageFavorite = "../../../../assets/image/favoriteFill.png";
      }

      if(response.rated.value != null){
        this.itemRated = response.rated.value;
        this.srcImageRated = "../../../../assets/image/starFill.png";
      }
    });
  }

  async addRemoveMovieRated(){
    if (this.itemRated == "" || this.itemRated == null){
      const ratedValue = await this.showRatingInputAlert();
  
      if(ratedValue !== null && ratedValue > 0 && ratedValue <= 10){
        this.userService.addMovieRated(this.idItem, ratedValue.toString(), this.id_session).pipe(
          catchError(error => {
            throw error;
          })
    
        ).subscribe(response => {
          this.itemRated = ratedValue.toString();
          this.srcImageRated = "../../../../assets/image/starFill.png";
      
          this.toast.fire({
            icon: 'success',
            title: '¡Valoración añadida!'});
        });

      }

    } else{
      this.showRemoveRatingConfirmation().then((result) => {
        if (result.isConfirmed) {
          this.userService.removeMovieRated(this.idItem, this.id_session).pipe(
            catchError(error => {
              throw error;
            })
      
          ).subscribe(response => {
            this.itemRated = "";
            this.srcImageRated = "../../../../assets/image/star.png";
        
            this.toast.fire({
              icon: 'success',
              title: '¡Valoración eliminada!'
            });
          });
        }
      });
    }
  }

  //Tv show details
  getTvShowDetails(){
    this.tvShowService.getTvShowById(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.tvShow = response;

      this.itemImage = this.tvShow.poster_path == null ? "../../../assets/image/noImageGrid-Horizontal.jpg" : this.srcImage + this.tvShow.poster_path;
      this.itemTitle = this.tvShow.name == null ? "" : this.tvShow.name;
      this.itemVoteAverage = this.tvShow.vote_average == null ? "" : this.tvShow.vote_average;
      this.itemSubtitle = (this.tvShow.number_of_seasons != null && this.tvShow.number_of_seasons > 1) ? this.tvShow.number_of_seasons + " temporadas" : this.tvShow.number_of_seasons + " temporada";

      if(this.tvShow.status == "Ended"){
        if(this.tvShow.first_air_date != null && this.tvShow.first_air_date != ""){
          this.itemDates = this.formatDate(this.tvShow.first_air_date) + (this.tvShow.last_air_date == null || this.tvShow.last_air_date == "" ? " - Finalizada" : " - " + this.formatDate(this.tvShow.last_air_date));
        }

      } else{
        this.itemDates = this.tvShow.first_air_date == null || this.tvShow.first_air_date == "" ? "" : this.formatDate(this.tvShow.first_air_date) + " - En progreso";
      }

      this.itemGenres = (this.tvShow.genres == null || this.tvShow.genres.length == 0) ? "" : this.getGenres(this.tvShow.genres);
      this.itemDescription = this.tvShow.overview == null ? "": this.tvShow.overview;

      this.title.setTitle((this.tvShow.name != null ? this.tvShow.name : "Detalle serie") + " - AllMovies");

      this.getTvShowTrailer();
      this.getTvShowCast();
      this.getAccountStatesTvShow();
    });
  }

  getTvShowTrailer(){
    this.tvShowService.getTvShowTrailer(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.itemTrailer = response;
    });
  }

  getTvShowCast(){
    this.tvShowService.getTvShowCast(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.tvShowCast = response;
    });
  }

  getAccountStatesTvShow(){
    this.userService.getAccountStatesTvShow(this.idItem, this.id_session).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      if(response.favorite == true){
        this.itemFavorite = true;
        this.srcImageFavorite = "../../../../assets/image/favoriteFill.png";
      }

      if(response.rated.value != null){
        this.itemRated = response.rated.value;
        this.srcImageRated = "../../../../assets/image/starFill.png";
      }
    });
  }

  async addRemoveTvShowRated(){
    if (this.itemRated == "" || this.itemRated == null){
      const ratedValue = await this.showRatingInputAlert();
  
      if(ratedValue !== null && ratedValue > 0 && ratedValue <= 10){
        this.userService.addTvShowRated(this.idItem, ratedValue.toString(), this.id_session).pipe(
          catchError(error => {
            throw error;
          })
    
        ).subscribe(response => {
          this.itemRated = ratedValue.toString();
          this.srcImageRated = "../../../../assets/image/starFill.png";
      
          this.toast.fire({
            icon: 'success',
            title: '¡Valoración añadida!'});
        });

      }

    } else{
      this.showRemoveRatingConfirmation().then((result) => {
        if (result.isConfirmed) {
          this.userService.removeTvShowRated(this.idItem, this.id_session).pipe(
            catchError(error => {
              throw error;
            })
      
          ).subscribe(response => {
            this.itemRated = "";
            this.srcImageRated = "../../../../assets/image/star.png";
        
            this.toast.fire({
              icon: 'success',
              title: '¡Valoración eliminada!'
            });
          });
        }
      });
    }
  }

  //Person details
  getPersonDetails(){
    this.personService.getPersonById(this.idItem).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.person = response;

      this.itemImage = this.person.profile_path == null ? "../../../assets/image/noImageGrid-Horizontal.jpg" : this.srcImage + this.person.profile_path;
      this.itemTitle = this.person.name == null ? "" : this.person.name;
      this.itemSubtitle = "";
      this.maxVote = "";
      this.itemDates = this.person.birthday == null ? "" : this.formatDate(this.person.birthday) + (this.person.deathday == null ? "" : " - " + this.formatDate(this.person.deathday));
      this.itemGenres = "";
      this.genresTitle = "";
      this.itemDescription = this.person.biography == null ? "" : this.person.biography;

      this.title.setTitle((this.person.name != null ? this.person.name : "Detalle persona") + " - AllMovies");

      this.getPersonKnownForItems();
    });
  }

  getPersonKnownForItems(){
    this.searchService.getPeopleSearch(this.person.name).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.personKnownForItems = response[0].known_for;

      this.personKnownForItems.forEach(item => {
        if(item.media_type == "movie"){
          this.personMovies.push(item);

        } else if(item.media_type == "tv"){
          this.personTvShows.push(item);
        }
      });
    });
  }

  //List details
  getListDetails(){
    this.userService.getListById(this.idItem, this.id_session).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.list = response;
      this.listItems = this.list.items;

      this.itemImage = this.list.poster_path == null ? "../../../assets/image/listDetail.png" : this.srcImage + this.list.poster_path;
      this.itemTitle = this.list.name == null ? "" : this.list.name;
      this.itemSubtitle = ((this.list.item_count > 0 && this.list.item_count != 1) ? this.list.item_count.toString() + " elementos" : (this.list.item_count == 0 ? " Sin elementos" : this.list.item_count.toString() + " elemento"));
      this.maxVote = "";
      this.itemDates = "";
      this.genresTitle = "";
      this.itemGenres = "";
      this.itemDescription = this.list.description == null ? "" : this.list.description;

      this.title.setTitle((this.list.name != null ? this.list.name : "Detalle lista") + " - AllMovies");
    });
  }

  async addToList(){
    try {
      const response = await this.userService.getUserLists(this.userId, this.id_session).toPromise();
    
      const inputOptions: string[] = [];
    
      response!.forEach(list => {
        inputOptions[list.id] = list.name;
      });
    
      const { value: idListSelected } = await Swal.fire({
        title: '¿A qué lista quieres añadir ' + this.itemTitle,
        input: 'select',
        inputOptions: inputOptions,
        inputPlaceholder: 'Selecciona una lista',
        showCancelButton: true,
        allowOutsideClick: true,
        confirmButtonColor: "#00b2e5",

        inputValidator: (value) => {
          return new Promise((resolve) => {
            if(value){
              this.userService.itemStatusFromList(value, this.idItem, this.id_session).pipe(
                catchError(error => {
                  throw error;
                })
              )
              .subscribe(response => {
                if(response["item_present"] == true){
                  resolve(this.itemTitle + ' ya está en esa lista');
      
                } else{
                  this.userService.addMovieToList(value, this.idItem.toString(), this.id_session).pipe(
                    catchError(error => {
                      throw error;
                    })
                  )
                  .subscribe(response => {
                    this.toast.fire({
                      icon: 'success',
                      title: '¡Película añadida!'});
                  });
                }
              });

            } else {
              resolve('Debes seleccionar una lista');
            }
          });
        }
      });
    
    } catch (error) {
      console.error(error);
    }
  }

  removeList(){
    Swal.fire({
      title: '¿Seguro que quieres eliminar ' + this.itemTitle + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"

    }).then((result) => {
      if (result.isConfirmed){
        this.userService.deleteList(this.idItem, this.id_session).pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(response => {
          this.toast.fire({
            icon: 'success',
            title: '¡Lista eliminada!'

          }).then(() => {
            this.router.navigateByUrl("/profile");
          });
        });
      }
    });
  }

  removeAllItemsFromList(){
    Swal.fire({
      title: '¿Seguro que quieres vaciar ' + this.itemTitle + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"

    }).then((result) => {
      if(result.isConfirmed){
        this.userService.clearList(this.idItem, this.id_session).pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(response => {
          this.toast.fire({
            icon: 'success',
            title: '¡Se han eliminado todos los elementos de ' + this.itemTitle + '!'

          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
