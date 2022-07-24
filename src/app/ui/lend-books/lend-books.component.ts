import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lend-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lend-books.component.html',
  styleUrls: ['./lend-books.component.css']
})
export class LendBooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
