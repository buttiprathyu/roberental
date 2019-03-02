import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  	private getURL = 'http://reqres.in/api/login'; // change this URL
  //  private postURL = 'https://reqres.in/api/users'; //Change this URL
  //  private url = '/api/login'; // change this URL
    private postURL = '/api/login'; //Change this URL
    constructor(private http: HttpClient) { }

	getLoginDetails() {
	    return this.http.get(this.getURL).toPromise().then((response) => response);
	}

  	postLoginDetails(data):Observable<any>{
  		let body = data;
    	return this.http.post<any>(this.postURL, body).pipe(map(response => {return response}));
 	}
}
