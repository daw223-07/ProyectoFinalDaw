import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MovieComponent } from './component/home/movie/movie.component';
import { ProfileComponent } from './component/home/profile/profile.component';
import { SearchComponent } from './component/home/search/search.component';
import { TvShowComponent } from './component/home/tv-show/tv-show.component';
import { CarouselComponent } from './component/home/section/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridHorizontalComponent } from './component/home/section/grid/grid-horizontal/grid-horizontal.component';
import { GridVerticalComponent } from './component/home/section/grid/grid-vertical/grid-vertical.component';
import { FooterComponent } from './component/footer/footer.component';
import { DetailComponent } from './component/home/detail/detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MovieComponent,
    ProfileComponent,
    SearchComponent,
    TvShowComponent,
    CarouselComponent,
    GridHorizontalComponent,
    GridVerticalComponent,
    FooterComponent,
    DetailComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true },
    { provide: LocationStrategy,
      useClass: HashLocationStrategy }
  ],

  bootstrap: [AppComponent]
})

export class AppModule{

}
