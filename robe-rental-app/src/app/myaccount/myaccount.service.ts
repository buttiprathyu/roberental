import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

	  private accountURL = '/api/myaccount'; 
    private paymentURL = '/api/paymentinfo'; 
    private imgUploadURL = '/api/imgupload';
    private signupURL = '/api/signup';
    
    constructor(private http: HttpClient) { }

    //getSignupDetails() {
      //return this.http.get(this.signupURL).toPromise().then((response) => response);
    //} 

	  getAccountDetails() {
      const params = new HttpParams()
      .set('email', localStorage.getItem('email'))
	    return this.http.get(this.accountURL,{params}).toPromise().then((response) => response);
	  }

  	postAccountDetails(data):Observable<any>{
  		let body = data;
    	return this.http.post<any>(this.accountURL, body).pipe(map(response => {return response}));
 	  }

 	  getPaymentDetails() {
	    return this.http.get(this.paymentURL).toPromise().then((response) => response);
	  }

  	postPaymentDetails(data):Observable<any>{
  		let body = data;
    	return this.http.post<any>(this.paymentURL, body).pipe(map(response => {return response}));
 	  }

    public uploadImage(image: File): Observable<Response> {
      const formData = new FormData();

      formData.append('image', image);
      
      return this.http.post<any>(this.imgUploadURL, formData);//.pipe(map(response => {return response}));
    }

  	postUploadDetails(data):Observable<Response>{
  		//let body = data;
      const formData = new FormData();
      
      formData.append('robeImg', data.robeImg);
      formData.append('email', data.email);
      formData.append('robeTitle', data.robeTitle);
      formData.append('rentPrice', data.rentPrice);
      formData.append('buyPrice', data.buyPrice);
      formData.append('robeSize', data.robeSize);
      formData.append('robeMaterialDesc', data.robeMaterialDesc);
      formData.append('robeMaterial', data.robeMaterial);
      formData.append('robeCare', data.robeCare);

    	return this.http.post<any>(this.imgUploadURL, formData);//.pipe(map(response => {return response}));
 	  }
}
