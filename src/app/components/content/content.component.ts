import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  activa: number;

  constructor() { }

  ngOnInit() {
  }

  cambiaPestana( pest ) {
    this.activa = pest.index;
    console.log( 'Activa: ' + this.activa );
  }

  cierraPestana( pest ) {
    this.activa = 0;
    console.log( 'Activa: ' + this.activa );
  }

}
