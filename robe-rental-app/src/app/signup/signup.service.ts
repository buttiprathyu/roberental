import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  	private getURL = '/api/signup';
    private postURL = 'api/signup';

    constructor(private http: HttpClient) { }

	getSignupDetails() {
	    return this.http.get(this.getURL).toPromise().then((response) => response);
	}

  	postSignupDetails(data):Observable<any>{
  		let body = data;
    	return this.http.post<any>(this.postURL, body).pipe(map(response => {return response}));
 	}
}

