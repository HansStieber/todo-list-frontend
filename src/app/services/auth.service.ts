import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUserAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    console.log(environment.baseUrl)
    const body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }
}
