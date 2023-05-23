import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AppComponent } from './app.component';
import { MovieComponent } from './component/home/movie/movie.component';
import { TvShowComponent } from './component/home/tv-show/tv-show.component';
import { SearchComponent } from './component/home/search/search.component';
import { ProfileComponent } from './component/home/profile/profile.component';
import { DetailComponent } from './component/home/detail/detail.component';

const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent, pathMatch: "full"},
  {path: 'peliculas', component: MovieComponent, pathMatch: "full"},
  {path: 'series', component: TvShowComponent, pathMatch: "full"},
  {path: 'buscar', component: SearchComponent, pathMatch: "full"},
  {path: 'perfil', component: ProfileComponent, pathMatch: "full"},
  {path: ':typeOfItem/:id', component: DetailComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{
  
}