import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user/user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  title = 'AllMovies';

  constructor(public userService: UserService, public router: Router) {
    
  }

  //Compruebo si existe session_id y userId en localStorage para mostrar el login o la home
  ngOnInit(): void{
    if(localStorage.getItem("session_id") != null && localStorage.getItem("userId") != null){
      var sessionId = localStorage.getItem("session_id") || "";
      
      //Vuelvo a coger los detalles del usuario por si los ha actualizado, actualizarlos en la aplicación también
      this.userService.getUserDetails(sessionId).pipe(
        catchError(error => {
          throw error;
        })
      )
      .subscribe(response => {
        localStorage.setItem('userAvatar', response.avatar.tmdb.avatar_path);
        localStorage.setItem('userUsername', response.username);
        localStorage.setItem('userName', response.name);
      
        if(this.router.url == "/"){
            this.router.navigateByUrl("/peliculas");
        }
      });
      
    } else{
      this.router.navigateByUrl("/login");
    }
  }
}