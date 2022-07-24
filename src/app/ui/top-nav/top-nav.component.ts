import {Component, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {MagicService} from "../../services/magic/magic.service";
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule , AppMaterialModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  menuItems = ['Home', 'Transaction'];


  ngOnInit(): void {
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private magic: MagicService) {
  }

  async logout() {
    await this.magic.Logout()
  }
}
