import {Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Services
import { ContractService } from "./../../services/contract/contract.service";
import { IdentityService } from "../../services/identity/identity.service";
import { MagicService } from "../../services/magic/magic.service";

// Material
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule , AppMaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  preferred = new FormControl('', [Validators.required]);

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
     this.name.setValue(response?.name ?? '');
      this.user = response
     console.log(this.user)
     this.loading = false
    }));
  }

  saveData(){
    const user = {
      name: this.name.value,
      status: this.user.status,
      preferences: this.preferred.value,
      booksRead: [ "Marry Shelley's Frankenstein", "The Lord of the Rings", "The Hobbit" ],
      lastLogin: Date.now(),
      gender: this.user.gender,

    }
    this.name.reset();
    this.preferred.reset();
    this.id.updateProfile(user);
    console.log(user)
  }





}
