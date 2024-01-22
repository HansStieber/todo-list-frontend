import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  async login() {
    try {
      let resp = await this.loginWithUserAndPassword(this.username, this.password);
      console.log(resp);
      // Redirect
      //deactivate form inputs
    } catch (e) {
      console.log(e);
    }
  }


  loginWithUserAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    console.log(environment.baseUrl)
    const body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }
}
