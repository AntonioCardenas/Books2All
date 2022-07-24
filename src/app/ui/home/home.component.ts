import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from "./../../services/contract/contract.service";
import { IdentityService } from "../../services/identity/identity.service";
import { MagicService } from "../../services/magic/magic.service";

// Modules
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule , AppMaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  data: any;
  authenticated: boolean = false;
  user: any | undefined;
  moreData: boolean | undefined;

  constructor(
    private contract: ContractService,
    private identity: IdentityService,
    private magic: MagicService) {

  }

  ngOnInit(): void {
    this.getMagicLog();
  }


  async getMagicLog() {
    await this.magic.State().then(value => {
      if (value === true) {
        this.authenticated = value
        this.callAccount();
        this.connectAccount()
      } else {
        this.authenticated = value
        this.user = undefined;
      }
    })

  }


  async callAccount() {
    await this.magic.getUser().then(value => {
      this.user = value;
      if (this.user.phoneNumber == null) {
        this.moreData = true;
      } else {
        this.moreData = false;
      }
    })
  }


  async connectAccount() {

  }

  async getDetails(account: any[]) {
    await this.identity.connect3id().then((value => {
      console.log(value.id);
    }));
    await this.getCeramicData()
  }

  async getCeramicData() {
    await this.identity.getProfileData().then((response => {
      console.log(response)
      this.profile = response
    }));
  }


}
