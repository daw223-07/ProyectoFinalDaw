import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  session_id: string = localStorage.getItem("session_id") || "";

  srcImage: string = environment.srcImage;
  userImage: string = "";
  
  logoutImage: string = "../../../assets/image/logout.png";

  navbarOpen = false;

  //Si el usuario no tiene avatar pongo una imagen de assets
  constructor(private router: Router, private userService: UserService){
    if(localStorage.getItem("userAvatar") == "null"){
      this.userImage = "../../../assets/image/noImageProfile.png";
    
    } else{
      this.userImage = this.srcImage + localStorage.getItem("userAvatar");
    }
  }

  //Para desplegar o no el menú cuando aparece el navbar-toggler
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  //Compruebo si la url en la que está el usuario (/peliculas) es la que se ha pulsado el navbar (navItem logo o navItem Peliculas), si es la misma recargo el componente
  reloadMoviesComponent() {
    const currentUrl = this.router.url;

    if(currentUrl == "/peliculas"){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  //Compruebo si la url en la que está el usuario (/series) es la que se ha pulsado el navbar (navItem Series), si es la misma recargo el componente
  reloadTvShowsComponent() {
    const currentUrl = this.router.url;

    if(currentUrl == "/series"){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  //Compruebo si la url en la que está el usuario (/buscar) es la que se ha pulsado el navbar (navItem Buscar), si es la misma recargo el componente
  reloadSearchComponent() {
    const currentUrl = this.router.url;

    if(currentUrl == "/buscar"){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  //Compruebo si la url en la que está el usuario (/perfil) es la que se ha pulsado el navbar (navItem Perfil), si es la misma recargo el componente
  reloadProfileComponent() {
    const currentUrl = this.router.url;

    if(currentUrl == "/perfil"){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  //Al entrar el ratón en el botón de logout cambia la imagen
  pointerEnterLogout(){
    this.logoutImage = "../../../assets/image/logoutHover.png";
  }

  //Al quitar el ratón del botón de logout cambia la imagen
  pointerLeaveLogout(){
    this.logoutImage = "../../../assets/image/logout.png";
  }

  //Logout
  logout(){
    Swal.fire({
      title: '¿Seguro que quieres\ncerrar sesión?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"

    }).then((result) => {
      if (result.isConfirmed){
        this.userService.deleteSession(this.session_id).pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(response => {
          localStorage.removeItem("userId");
          localStorage.removeItem("session_id");
          localStorage.removeItem("userAvatar");
          localStorage.removeItem("userUsername");
          localStorage.removeItem("userName");
    
          this.router.navigateByUrl("/login");
        });
      }
    });
  }
}
