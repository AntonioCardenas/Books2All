import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.css']
})
export class GetBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
