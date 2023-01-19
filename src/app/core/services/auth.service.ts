import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, map, catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router){ }

  private url:string = "http://localhost:3000";

  public sign(payLoad: {email: string, pass: string} ): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/sign`, payLoad).pipe(
      map((data)=>
      {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', JSON.stringify(data.token));

        return this.router.navigate(['admin']);
      }),
      catchError((e)=>
      {
        if (e.error.message) return throwError(() => e.error.message)

        return throwError(() => "Ops! Estamos com problemas no servidor");
      })

    )
  }

  public logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean{
    const token= localStorage.getItem('access_token');
    
    if(!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }



}
