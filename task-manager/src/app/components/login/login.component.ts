import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiAppearance, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle } from "@taiga-ui/core";
import { TuiActiveZone } from "@taiga-ui/cdk/directives/active-zone";
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { AsyncPipe } from "@angular/common";

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
    TuiPassword
]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
}