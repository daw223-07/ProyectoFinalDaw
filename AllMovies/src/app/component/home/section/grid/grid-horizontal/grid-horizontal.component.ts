import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grid-horizontal',
  templateUrl: './grid-horizontal.component.html',
  styleUrls: ['./grid-horizontal.component.css']
})

export class GridHorizontalComponent {
  
  srcImage: string = environment.srcImage;

  @Input() typeOfItem: string = "";

  @Input() items: any[] = [];

  @Input() title: string = "";

  @Output() pagination = new EventEmitter<any>();

  @ViewChild('rowPoster', { static: false }) rowPoster: ElementRef | undefined;

  constructor(){
    
  }

  //Cuando el usuario hace scroll y llega casi al ancho máximo se ejecuta la función que le paso al componente para hacer la paginación
  onElementScroll(){
    const posFake = this.rowPoster?.nativeElement.scrollLeft;
    const max = this.rowPoster?.nativeElement.scrollWidth;

    const pos = posFake + 1900;

    if(pos >= max){
      this.pagination.emit();
    }
  }
}
