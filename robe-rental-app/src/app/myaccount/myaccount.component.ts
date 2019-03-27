import { Component, OnInit } from '@angular/core';
import { MyaccountService } from './myaccount.service';

export interface myServerMsg{
	successMsg : string,
	token : string
};

export interface personalInterface{
	email?: string;
	firstname?:  string;
	lastname?: string;
	address1? : string;
	address2? : string;
	city? : string;
	state? : string;
	zipcode? : number;
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
	personalDetails : personalInterface;
	serverMsg : myServerMsg;
	showMsg : boolean;
	displayMsg : string;
	email?: string;
	firstname?:  string;
	lastname?: string;
	address1? : string;
	address2? : string;
	city? : string;
	state? : string;
	zipcode? : number;

	// image upload
	selectedFile: ImageSnippet;
	robeImg : File;
	url : any;
	title: string;
	rentprice: number;
	buyprice: number;
	size: string;
	materialdesc : string;
	materialtype :  string;
	care : string;

    constructor(public myaccountService: MyaccountService) {} 


    getPersonalDetails() : void {

		// to get the details from myaccount API
	  	this.myaccountService.getAccountDetails().then(data => {
	  		console.log(data);
		    if(data){
		    	this.personalDetails = data;
		    	this.firstname = this.personalDetails.firstname; 
			  	this.lastname =  this.personalDetails.lastname; 
			  	this.email = this.personalDetails.email;
			  	this.address1 = this.personalDetails.address1;
				this.address2 = this.personalDetails.address2;
				this.city = this.personalDetails.city;
				this.state = this.personalDetails.state;
				this.zipcode = this.personalDetails.zipcode;
		    } else {
		    	// to get the details of First Name, Last Name and Email from signup API
				this.myaccountService.getSignupDetails().then(data => {
				console.log(data);
				    if(data){
				    	this.personalDetails = data;
				    	this.firstname = this.personalDetails.firstname; 
					  	this.lastname =  this.personalDetails.lastname; 
					  	this.email = this.personalDetails.email;
				    }
				});
		    }
		});
  	}
    

  	// to post the details to myaccount API
  	createAccount() : void {
  		console.log(this.firstname);
  		let personalData = { 
	  		"firstname" : this.firstname, 
	  		"lastname": this.lastname, 
	  		"email": this.email ,
	  		"address1" : this.address1,
			"address2" : this.address2,
			"city" : this.city,
			"state" : this.state,
			"zipcode" : this.zipcode
  		};
  		this.myaccountService.postAccountDetails(personalData).subscribe(data => {
  				console.log(data);
		        this.serverMsg = data;
		        if(this.serverMsg.successMsg && this.serverMsg.token){
			     	this.showMsg = true;
			      	this.displayMsg = "Personal Details have been successfully saved.";
			    } else {
			      	this.showMsg = true;
			      	this.displayMsg = "Error while saving the details. Please try Again.";
			    }
	    	});
	}

	processFile(imageInput: any) {
	    const file: File = imageInput.files[0];
	    const reader = new FileReader();

	    reader.addEventListener('load', (event: any) => {

	    	this.selectedFile = new ImageSnippet(event.target.result, file);
	    	this.robeImg = imageInput.files[0];

	    	/*this.myaccountService.uploadImage(this.selectedFile.file).subscribe(
	        (res) => {
	        
	        },
	        (err) => {
	        
	        })*/
		});
    	reader.readAsDataURL(file);
    	//reader.readAsDataURL(event.target.files[0]);
	    reader.onload = (event) => { 
	      this.url = reader.result; 
	    }
	}


	sellGarment() : void{
		
		let sellData = {
	      	"email" : this.email,
	      	"robeImg" : this.robeImg,
	      	"robeTitle": this.title,
      		"rentPrice": this.rentprice,
      		"buyPrice": this.buyprice,
      		"robeSize": this.size,
      		"robeMaterialDesc" : this.materialdesc,
      		"robeMaterial" :  this.materialtype,
      		"robeCare" : this.care
	      };

	    
	    this.myaccountService.postUploadDetails(sellData).subscribe(
	        (res) => {
	        
	       },
	        (err) => {
	        
	    });
	}
	
  	

  	
  ngOnInit(){this.getPersonalDetails();}

 

}
