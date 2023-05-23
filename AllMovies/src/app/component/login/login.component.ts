import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AvatarPath, Tmdb, User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  //Valor de los inputs
  usernameInputValue: string = "";
  passwordInputValue: string = "";

  request_token: string = "";
  id_session: string = "";

  avatarPath: AvatarPath = { avatar_path: "" };

  tmdb: Tmdb = { tmdb: this.avatarPath }

  user: User = {
    id: 0,
    name: "",
    avatar: this.tmdb,
    username: ""
  };

  emptyInputsBool: boolean = false;

  //Le pongo el título a la página
  constructor(private title: Title, private userService: UserService, public router: Router){
    this.title.setTitle('Iniciar sesión - AllMovies');
  }

  //Si los campos no están vacíos intenta iniciar sesión
  login(){
    if(this.usernameInputValue != "" && this.passwordInputValue != ""){
      this.createRequestToken();

    } else{
      this.emptyInputs();
    }
  }

  //Si algún campo está vacío informa al usuario
  emptyInputs(){
    if (this.usernameInputValue.trim() === '' || this.passwordInputValue.trim() === '') {
      this.emptyInputsBool = true;

      return;
    }
  }

  //Guardo la información necesaria en el localStorage
  saveUserDetails(){
    localStorage.setItem('userId', this.user.id.toString());
    localStorage.setItem('session_id', this.id_session);
    localStorage.setItem('userAvatar', this.user.avatar.tmdb.avatar_path);
    localStorage.setItem('userUsername', this.user.username);
    localStorage.setItem('userName', this.user.name);
  }

  //User detail: le doy valor a las variables que necesito guardar en localStorage y redirijo al usuario a la página principal /peliculas
  getUserDetail(session_id: string){
    this.userService.getUserDetails(session_id).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.user.id = response.id;
      this.user.avatar = response.avatar;
      this.user.username = response.username;
      this.user.name = response.name;

      this.saveUserDetails();

      this.router.navigateByUrl("/peliculas");
    });
  }

  //Create session_id
  createSessionId(request_token: string){
    this.userService.createSessionId(request_token).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.id_session= response['session_id'];

      this.getUserDetail(this.id_session);
    });
  }

  //Create session
  createSessionWithLogin(username: string, password: string, request_token: string){
    this.userService.createSessionWithLogin(username, password, request_token).pipe(
      catchError(error => {
        throw error;
      })
    )
    .subscribe(response => {
      this.createSessionId(request_token);
    });
  }

  //Create request_token
  createRequestToken(){
    this.userService.getRequestToken().pipe(
      catchError(error => {
        throw error; 
      })
    )
    .subscribe(response => {
      this.request_token = response['request_token'];

      this.createSessionWithLogin(this.usernameInputValue, this.passwordInputValue, this.request_token);
    });
  }

}
