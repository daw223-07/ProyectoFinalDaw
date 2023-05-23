import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/model/person';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  getPersonByIdRequest = "person/";

  constructor(private http: HttpClient){
    
  }

  //Person by id
  getPersonById(id:string): Observable<Person>{
    return this.http.get<Person>(environment.apiUrl + this.getPersonByIdRequest + id + environment.api_key + environment.language).pipe(
      map((resp) =>{
        return resp;
    }));
  }
}