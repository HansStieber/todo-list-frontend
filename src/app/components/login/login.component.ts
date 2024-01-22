import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  async login() {
    try {
      let resp = await this.authService.loginWithUserAndPassword(this.username, this.password);
      console.log(resp);
      // Redirect
      //deactivate form inputs
    } catch (e) {
      console.log(e);
    }
  }
}
