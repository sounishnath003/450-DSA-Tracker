import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private cmsService: CmsService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.cmsService.cmsLogin(username, password).subscribe((response: any) => {
      try {
        if (response.response.status != 201) return;
        this.router.navigate(['', 'cms']);
      } catch (error) {
        window.location.replace('/');
      }
    });
  }
}
