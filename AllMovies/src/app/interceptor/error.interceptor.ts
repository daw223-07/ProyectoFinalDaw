import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public router: Router) {

    }

    //Función para controlar los errores que me da la API
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(catchError((error) => {
            if (error instanceof HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                    console.error("Error Event");

                } else{
                    //Depende del número status_code muestro un alert u otro
                    if(error.error["status_code"] == 30){
                        Swal.fire({
                            icon: 'error',
                            title: 'Inicio de sesión fallido.',
                            text: 'Por favor, verifica tus credenciales e inténtalo de nuevo',
                            confirmButtonColor: "#00b2e5"

                        }).then((result) => {
                            this.router.navigateByUrl("/");
                        });
                           
                    } else if(error.error["status_code"] == 11){
                        Swal.fire({
                            icon: 'error',
                            title: 'Se produjo un error en el servidor.',
                            text: 'Por favor, inténtalo más tarde',
                            confirmButtonColor: "#00b2e5"
                            
                        }).then((result) => {
                            this.router.navigateByUrl("/");
                        });
                    
                    } else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un error.',
                            text: 'Por favor, inténtalo más tarde',
                            confirmButtonColor: "#00b2e5"
                            
                        }).then((result) => {
                            this.router.navigateByUrl("/");
                        });
                    }

                    console.log(`error status : ${error.status} ${error.statusText} ${error.error["status_code"]}`);
                } 

            } else{
                console.error("some thing else happened");
            }
            
            return throwError(error);
        })
    )
    }
}