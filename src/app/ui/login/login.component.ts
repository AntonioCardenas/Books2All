import {Component} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MagicService} from "../../services/magic/magic.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'Email address is required';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  matcher = new MyErrorStateMatcher();

  constructor(private magic: MagicService) {
  }

  login() {
    const user = this.emailFormControl.value;
    this.render(user)
  }

  async render(user: any) {
    this.magic.render(user);
  }

}
