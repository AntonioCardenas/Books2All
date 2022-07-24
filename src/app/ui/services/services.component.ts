import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
   showCategory: string = 'full';
   data: any
  constructor() { }

  ngOnInit(): void {
    this.data = new Date()
  }

  showService(here:string){
    console.log(here)
    this.showCategory = here

  }


}
