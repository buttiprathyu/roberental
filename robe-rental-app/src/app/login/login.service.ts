import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  	private getURL = '/api/login'; 
    private postURL = '/api/login'; 
    constructor(private http: HttpClient) { }

	getLoginDetails() {
	    return this.http.get(this.getURL).toPromise().then((response) => response);
	}

  	postLoginDetails(data):Observable<any>{
  		let body = data;
    	return this.http.post<any>(this.postURL, body).pipe(map(response => {return response}));
 	}
}
