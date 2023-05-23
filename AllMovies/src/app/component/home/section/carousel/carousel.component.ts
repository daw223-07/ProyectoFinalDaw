import { Component, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})

export class CarouselComponent {

  srcImage: string = environment.srcImage;

  @Input() typeOfItem: string = "";

  @Input() items: any[] = [];
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 2500;
    config.keyboard = true;
    config.pauseOnHover = true;    
  }
}
