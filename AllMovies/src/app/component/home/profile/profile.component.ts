import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { List } from 'src/app/model/list';
import { Movie } from 'src/app/model/movie';
import { TvShow } from 'src/app/model/tv-show';
import { UserService } from 'src/app/service/user/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  srcImage: string = environment.srcImage;
  userImage: string = "";

  userId: string = localStorage.getItem("userId") || "";
  session_id: string = localStorage.getItem("session_id") || "";
  userAvatar: string = localStorage.getItem("userAvatar") || "";
  userUsername: string = localStorage.getItem("userUsername") || "";
  userName: string = localStorage.getItem("userName") || this.userUsername;

  movieLists: string[] = [];
  tvLists: string[] = [];
  idNewList: string = "";

  showListsBool: boolean = true;
  lists: List[] = [];
  numberOfLists: number = 0;
  numberOfListsText: string = "";

  showFavoritesBool: boolean = true;
  favoriteMovies: Movie[] = [];
  favoriteTvShows: TvShow[] = [];
  numberOfFavorites: number = 0;

  showRatedsBool: boolean = true;
  ratedMovies: Movie[] = [];
  ratedTvShows: TvShow[] = [];
  numberOfRateds: number = 0;

  moviesTitle: string = "Películas";
  tvShowsTitle: string = "Series";

  toast: any;
  
  //Le pongo el título a la página y cojo el avatar de localStorage para la imagen del perfil
  constructor(private title:Title, private userService: UserService, public router: Router) {
    this.title.setTitle('Mi perfil - AllMovies');

    if(localStorage.getItem("userAvatar") == "null"){
      this.userImage = "../../../assets/image/noImageProfile.png";
    
    } else{
      this.userImage = this.srcImage + this.userAvatar;
    }

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

  //Lo primero que se muestra son las listas así que llamo a showLists() y hago las demás llamadas para poder poner el total de listas, favoritos y valoraciones que tiene el usuario
  ngOnInit(){
    this.showLists();

    this.getLists();
    this.getFavoriteMovies();
    this.getRatedMovies();
  }

  //Pongo el scroll de la ventana al principio y reseteo las páginas a 1 de todas las llamadas cuando se destruye el componente
  ngOnDestroy() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.userService.resetPages();
  }

  //Lists
  showLists(){
    this.showListsBool = true;
    this.showFavoritesBool = false;
    this.showRatedsBool = false;
  }

  getLists(){
    this.userService.getUserLists(this.userId, this.session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.numberOfLists = this.userService.numberOfLists;
      this.lists = response;

      if(this.numberOfLists > 1 || this.numberOfLists == 0){
        this.numberOfListsText = " listas";
        
      }else{
        this.numberOfListsText = " lista";
      }
    });
  }

  async addList(){
    const { value: nameValue } = await Swal.fire({
      title: 'Introduce el nombre de la lista',
      input: 'text',
      confirmButtonText: 'Siguiente',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#00b2e5",

      inputValidator: (value) => {
        if(!value){
          return 'Debes rellenar el campo';
        }

        return null;
      }
    });
  
    if(nameValue){
      Swal.fire({
        title: 'Introduce la\ndescripción de la lista',
        text: 'Si no quieres que tenga descripción, presiona el botón Aceptar',
        input: 'text',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        allowOutsideClick: true,
        confirmButtonColor: "#00b2e5"
      }).then((result) => {
        if(result.isConfirmed){
          const descriptionValue = result.value;

          this.userService.addList(nameValue, descriptionValue, this.session_id).pipe(
            catchError(error => {
              throw error;
            })
          )
          .subscribe(response => {
            this.toast.fire({
              icon: 'success',
              title: '¡Lista creada!'
            }).then(() => {
              window.location.reload()
            });
          });
        }
      });
    }
  }

  //Favorite movies
  showFavorites(){
    this.showListsBool = false;
    this.showFavoritesBool = true;
    this.showRatedsBool = false;
  }

  getFavoriteMovies(){
    this.userService.getUserFavoriteMovies(this.userId, this.session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.favoriteMovies = response;
      this.getFavoriteTvShows();
    });
   }

  paginationFavoriteMovies() {
    if (this.userService.favoriteMoviesLoading) {
      return;
    }
        
    this.userService.getUserFavoriteMovies(this.userId, this.session_id).subscribe((favoriteMovies) => {
      this.favoriteMovies.push(...favoriteMovies);
    });
  }

  //Favorite tv shows
  getFavoriteTvShows(){
    this.userService.getUserFavoriteTvShows(this.userId, this.session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.numberOfFavorites = this.userService.numberOfFavoriteMovies + this.userService.numberOfFavoriteTvShows;
      this.favoriteTvShows = response;
    });
   }

  paginationFavoriteTvShows() {
    if (this.userService.favoriteTvShowsLoading) {
      return;
    }
        
    this.userService.getUserFavoriteTvShows(this.userId, this.session_id).subscribe((favoriteTvShows) => {
      this.favoriteTvShows.push(...favoriteTvShows);
    });
  }

  //Rated movies
  showRateds(){
    this.showListsBool = false;
    this.showFavoritesBool = false;
    this.showRatedsBool = true;
  }

  getRatedMovies(){
    this.userService.getUserRatedMovies(this.userId, this.session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.ratedMovies = response;
      this.getRatedTvShows();
    });
   }

  paginationRatedMovies() {
    if (this.userService.ratedMoviesLoading) {
      return;
    }
        
    this.userService.getUserRatedMovies(this.userId, this.session_id).subscribe((ratedMovies) => {
      this.ratedMovies.push(...ratedMovies);
    });
  }

  //Rated tv shows
  getRatedTvShows(){
    this.userService.getUserRatedTvShows(this.userId, this.session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.numberOfRateds = this.userService.numberOfRatedMovies + this.userService.numberOfRatedTvShows;
      this.ratedTvShows = response;
    });
   }

  paginationRatedTvShows() {
    if (this.userService.ratedTvShowsLoading) {
      return;
    }
        
    this.userService.getUserRatedTvShows(this.userId, this.session_id).subscribe((ratedTvShows) => {
      this.ratedTvShows.push(...ratedTvShows);
    });
  }
}
