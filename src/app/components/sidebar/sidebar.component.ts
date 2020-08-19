import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _usuario: string;
  
  public get usuario(): string {
    return this._usuario;
  }
public set usuario(value: string) {
    this._usuario = value;
  }

  constructor() { }

  ngOnInit() {
    
    this.usuario = "77322670M";
  }

}
