import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  onUsernameError() {
    if (this.loginForm.get('username')?.hasError('required'))
      return 'Please enter your username!';

    return this.loginForm.get('username')?.hasError ?? 'Not a valid username';
  }

  onPasswordError() {
    if (this.loginForm.get('password')?.hasError('required'))
      return 'Please enter your password!';

    return this.loginForm.get('password')?.hasError ?? 'Not a valid password';
  }

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();
    this.authService
      .signupWithUsernamePassword(username, password)
      .subscribe((response: any) => {
        this.router.navigate([
          this.route.snapshot.queryParamMap.get('redirectTo'),
        ]);
      });
  }
}
