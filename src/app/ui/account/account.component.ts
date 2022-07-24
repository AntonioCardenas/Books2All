import {Component, Input, OnInit,} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

// Services
import { ContractService } from "./../../services/contract/contract.service";
import { IdentityService } from "../../services/identity/identity.service";
import { MagicService } from "../../services/magic/magic.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  home = new FormControl('', [Validators.required]);
  bio = new FormControl('', [Validators.required]);

  public user: any;
  public userMagic: any;
  loading: boolean = true;


  constructor(private contract: ContractService, private id: IdentityService, private magic: MagicService) { }

  ngOnInit(): void {
    this.getMagicLog();
  }


  async getMagicLog(){
    await this.magic.State().then(value => {
      if(value === true){
        this.callAccount();
        this.getCeramicId();
      } else {
        this.loading = true;
      }
    })

  }

  async callAccount(){
  await this.magic.getUser().then(value => {
    this.userMagic = value
    console.log(this.userMagic);
    })
  }


 async getCeramicId(){
  await this.id.connect3id().then((value => {
    }));
  await this.getCeramicData()
 }



  async getCeramicData(){
   await this.id.getProfileData().then((response => {
     this.bio.setValue(response?.['bio']);
     this.name.setValue(response?.name);
      this.home.setValue(response?.homeLocation);
     this.user = response
     this.loading = false
    }));
  }

  saveData(){
    const user = {
      bio: this.bio.value,
      name: this.name.value,
      home: this.home.value,
      aft: this.user.affiliations,
      nct: this.user.nationalities,
      gender: this.user.gender,
    }
    this.id.updateProfile(user);
    console.log(user)
  }





}
