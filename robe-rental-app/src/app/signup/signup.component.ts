import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SignupService } from './signup.service';

export interface myServerMsg{
	successMsg : string,
	token : string
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	email: string;
	password: string;
	firstname:  string;
	lastname: string;
	showError: boolean = false;
	errorText: string;
	signedUser: myServerMsg;
	//signedUser:  Object;//{"successMsg" : string ,"token": string};


  	constructor(private router: Router, public signupService: SignupService) { }

  	register() : void {
  		let data = {"firstname" : this.firstname, "lastname": this.lastname, "email": this.email ,"password":this.password };
  		
  		localStorage.setItem('email', this.email);
  		localStorage.setItem('firstname', this.firstname);
  		localStorage.setItem('lastname', this.lastname);

  		this.signupService.postSignupDetails(data).subscribe(data => {
		        this.signedUser = data;
		        if(this.signedUser.successMsg && this.signedUser.token){
			     	this.router.navigate(["myaccount"]);
			    } else {
			      	this.showError = true;
			      	this.errorText = "Error while creating an account. Please try Again.";
			    }
	    	});
	}

	ngOnInit() {
	}

}
