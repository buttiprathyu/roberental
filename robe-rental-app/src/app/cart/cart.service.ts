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
	//public cartList : Array<myRobe>;
  	constructor(private http: HttpClient) { }
  	//this.cartList = [];

	//public setCartItems(): void{
	//console.log("sadasdasd");
	  	//this.cartList.push(robe);
	//}

	//console.log(this.cartList);
}
