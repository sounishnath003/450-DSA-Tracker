import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
      .signinWithUsernamePassword(username, password)
      .subscribe((response: any) => {
        this.router.navigate([
          this.route.snapshot.queryParamMap.get('redirectTo'),
        ]);
      });
  }
}
