import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  	private getURL = 'http://reqres.in/api/login'; // change this URL
   
    constructor(private http: HttpClient) { }

	getRobeDetails() {
	    return this.http.get(this.getURL).toPromise().then((response) => response);      
	}
}

