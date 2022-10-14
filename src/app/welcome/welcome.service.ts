import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  headers: HttpHeaders;

  constructor(public http: HttpClient, private angularFireAuth: AngularFireAuth) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    /*this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');*/
  }

  getUser(){
    return this.http.get('#');
  }

  signIn(value) {
    const url = 'http://localhost/epos/api/movil/login';
      const data = {usuario: value.username, clave: value.password};
      const response = fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    });
    response.then(res => console.log(res));
  }

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }

}
