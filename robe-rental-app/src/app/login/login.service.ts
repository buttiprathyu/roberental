import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  	private url = 'http://reqres.in/api/login'; // change this URL
    private postURL = 'https://reqres.in/api/users'; //Change this URL

    constructor(private http: HttpClient) { }

	getLoginDetails() {
	    return this.http.get('https://reqres.in/api/login').toPromise().then((response) => response);      
	}

  	postLoginDetails(data):Observable<any>{
  		let body = JSON.stringify(data);
    	return this.http.post<any>(this.postURL, body).pipe(map(response => {return response}));
 	}	
}
