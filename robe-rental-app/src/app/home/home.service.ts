import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  	private getURL = 'api/robeList'; 
   
    constructor(private http: HttpClient) { }

	getRobeDetails() {
		const params = new HttpParams()
        .set('email', localStorage.getItem('email'))
	   // return this.http.get(this.getURL, {params}).toPromise().then((response) => response);  
	    return this.http.get(this.getURL).toPromise().then((response) => response);     
	}
}

