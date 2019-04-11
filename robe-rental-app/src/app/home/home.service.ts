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
		let sizeArr = [];
		const params = new HttpParams()
        .set('email', localStorage.getItem('email'))
        .set('price', '0')
        .set('size', sizeArr.toString());
	   return this.http.get(this.getURL, {params}).toPromise().then((response) => response);  
	    //return this.http.get(this.getURL).toPromise().then((response) => response);     
	}

	getRobeDetailsByOrder(data){
		let priceVal = '';

		if(data.price === 'low'){
			priceVal = '-1';
		} else if(data.price === 'high'){
			priceVal = '1';
		} else {
			priceVal = '0';
		}
		
		const params = new HttpParams()
		.set('email', localStorage.getItem('email'))
		.set('price', priceVal)
		.set('size', (data.size).toString());
		return this.http.get(this.getURL, {params}).toPromise().then((response) => response);
	}

}

