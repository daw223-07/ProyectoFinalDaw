import { Component, Input } from '@angular/core';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-vertical',
  templateUrl: './grid-vertical.component.html',
  styleUrls: ['./grid-vertical.component.css']
})

export class GridVerticalComponent {
  
  srcImage: string = environment.srcImage;

  id_session: string = localStorage.getItem("session_id") || "";

  @Input() typeOfItem: string = "";

  @Input() items: any[] = [];

  @Input() idList: string = "";

  @Input() nameList: string = "";

  toast: any;

  constructor(public userService: UserService){
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

  //Al clickar en la imagen remove de un elemento elimino esa película de la lista en la que está (el idList y nameList se lo paso al componente en el html)
  removeItem(event: Event, idItem: string, nameMovie: string){
    event.stopPropagation();

    Swal.fire({
      title: '¿Seguro que quieres eliminar ' + nameMovie + ' de la lista?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: "#00b2e5"

    }).then((result) => {
      if (result.isConfirmed){
        this.userService.deleteItemFromList(this.idList, idItem, this.id_session).pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(response => {
          this.toast.fire({
            icon: 'success',
            title: '¡' + nameMovie + ' se ha eliminado de ' + this.nameList + '!'

          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
