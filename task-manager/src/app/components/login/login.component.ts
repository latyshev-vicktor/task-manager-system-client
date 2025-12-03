import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiAlertService, TuiAppearance, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle, TuiLoader } from "@taiga-ui/core";
import { TuiActiveZone } from "@taiga-ui/cdk/directives/active-zone";
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, TuiPassword, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { AsyncPipe } from "@angular/common";
import { UserService } from "../../services/user-service";
import { Router } from "@angular/router";
import { AuthStore } from "../../services/auth.store";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    TuiAppearance,
    TuiButton,
    TuiTextfield,
    TuiTitle,
    TuiActiveZone,
    TuiCardLarge,
    ReactiveFormsModule,
    TuiForm,
    TuiHeader,
    AsyncPipe,
    TuiError,
    TuiFieldErrorPipe,
    TuiIcon,
    TuiPassword,
    TuiLoader
],
  providers: [
    tuiValidationErrorsProvider({
        required: 'Поле необходимо для заполнения',
        email: 'Не корректно заполненнный email',
    }),
  ],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [Validators.required]),
  });

  private userService = inject(UserService);
  private authState = inject(AuthStore);
  private alerts = inject(TuiAlertService);
  private router = inject(Router);

  submit() {
    if(this.form.invalid) return;

    const loginModel = this.form.getRawValue();
    this.authState.login(loginModel.email, loginModel.password).subscribe(res => {
      this.alerts.open('Добро пожаловать!', {
        label: 'Успешно',
        appearance: 'positive',
        icon: '@tui.heart'
      }).subscribe();
      this.router.navigate(['/sprint-list']);
    }, error => {
      const errorMessage = error?.error?.message;
      this.alerts.open(errorMessage, {
        label: 'Ошибка',
        appearance: 'negative'
      }).subscribe()
    });
  }
}