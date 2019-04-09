import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*export interface myRobe{
  email? : string,
  robeTitle? : string,
  robeImg? : string,
  rentPrice? : number,
  buyPrice? : number,
  robeSize? : string,
  robeMaterialDesc?: string,
  robeMaterial? : string,
  robeCare? : string
};*/



export class CartService {
	
  	constructor(private http: HttpClient) { }
  	private data = []; 
    private postURL = '/api/cart' 
  
    setRobeList(value) {      
      this.data.push(value); 
      console.log(this.data); 
    }  
    
    getRobeList() {  
      return this.data;  
    }  

    deleteRobe(value){
        this.data.forEach( (item, index) => {
           if(item === value) this.data.splice(index,1);
        });
    }

    postCartDetails(requestData):Observable<any>{
      let body = requestData;
      return this.http.post<any>(this.postURL, body).pipe(map(response => {return response}));
    }
}
