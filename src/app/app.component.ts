import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Plan Director Web";

  constructor() {
    console.log(environment.mensaje);
  }

  
}
