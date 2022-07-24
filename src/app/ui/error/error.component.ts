import { Component, OnInit } from '@angular/core';
import { MagicService} from "../../services/magic/magic.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {



  constructor(private magic: MagicService) { }

  ngOnInit(): void {
  }


  getdata(){
    this.magic.getUser()
  }


}
