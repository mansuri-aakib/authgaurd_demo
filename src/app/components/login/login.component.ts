import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public signInForm!: FormGroup;
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);

  ngOnInit(): void {
    sessionStorage.setItem('applicationCode', 'TAB_Backup');
    
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['hardik.thakkar@techextensor.com', [Validators.required, Validators.email]],
      password: ['P@ssw0rd', Validators.required]
    });
  }

  onSubmit() {
    this._authService.signIn(this.signInForm.value).subscribe(() => {
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '';
      this._router.navigateByUrl(redirectURL);
    })
  }
}
