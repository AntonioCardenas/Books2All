import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

// Services
import { ContractService } from "./../../services/contract/contract.service";
import { IdentityService } from "../../services/identity/identity.service";
import { MagicService } from "../../services/magic/magic.service";


@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule , AppMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  title = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  pages = new FormControl('', [Validators.required]);
  editorial = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  pdf = new FormControl('', [Validators.required]);
  image = new FormControl('', [Validators.required]);

  public user: any;
  public userMagic: any;
  loading: boolean = true;

  constructor(private id: IdentityService, private magic: MagicService) { }

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
      this.user = response
     console.log(this.user)
     this.loading = false
    }));
  }



  saveData(){
    const userBook = {
      lastLogin: Date.now(),
      books: [{
        "title": this.title.value,
        "category": this.category.value,
        "author": this.author.value,
        "pages": this.pages.value,
        "editorial": this.editorial.value,
        "description": this.description.value,
        "pdf": this.pdf.value,
        "image": this.image.value,
      }]
    }
    this.title.reset();
    this.category.reset();
    this.author.reset();
    this.pages.reset();
    this.editorial.reset();
    this.description.reset();
    this.pdf.reset();
    this.image.reset();
    this.id.updateProfile(userBook);
    console.log(userBook)
  }



}
