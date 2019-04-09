import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';


export interface myRobe{
  email? : string,
  robeTitle? : string,
  robeImg? : string,
  rentPrice? : number,
  buyPrice? : number,
  robeSize? : string,
  robeMaterialDesc?: string,
  robeMaterial? : string,
  robeCare? : string
};

export interface myServerMsg{
	successMsg : string,
	token : string
};


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  	robeList : any[];
	panelOpenState = false;
	cartTotal : number = 0;
	cartObj : myServerMsg;
	showMsg: boolean = false;
	showText: string;
	creditcard : number;
	expirydate : string;
	cvv : number;

  	constructor(public cartService : CartService) { 
  		
	   
  	}

  	

  	deletefromcart = function(myRobe){
  		this.cartService.deleteRobe(myRobe);
  		this.cartTotal = 0;
  		for(let robe of this.robeList){
 			this.cartTotal += robe.rentPrice;
 		}
  	}
      
    checkout() : void {
		let emailVal = localStorage.getItem('email');
		let requestData = {
			"email" : emailVal,
			"robeList" : this.robeList,
			"creditcard" : this.creditcard,
			"expirydate" : this.expirydate,
			"cvv" : this.cvv
		}; 
	    this.cartService.postCartDetails(requestData).subscribe(data => {
		        this.cartObj = data;
		        if(this.cartObj.successMsg && this.cartObj.token){
			     	this.showMsg = true;
			     	this.showText = "Your Order number is RR"+Math.random()*10000+". You will receive your garment in 5-7 working days. We will notify you once we ship the garment with tracking details."
			    } else {
			      	this.showMsg = true;
			      	this.showText = "Something went wrong. Please try again.";
			    }
	    	});
	}

  

 	ngOnInit() { 
 		this.robeList = this.cartService.getRobeList();
 		
 		for(let robe of this.robeList){
 			this.cartTotal += robe.rentPrice;
 		}
 		 
 	}    

}
