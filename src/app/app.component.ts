import {AfterContentInit, Component} from '@angular/core';
import { MagicService } from "./services/magic/magic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title: 'Government Decentralization' | undefined;
  authenticated : boolean = false;

  ngAfterContentInit() {
    this.getMagicLog();
  }

  constructor(
    private route: Router,
    private magic: MagicService) { }



  async getMagicLog(){
    await this.magic.State().then((value: boolean) => {
      if(value === true){
        this.authenticated = value;
        this.route.navigate(['/home'])
      } else {
        this.authenticated = value;
      }
    });

  }

}
