import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SignupService } from './signup.service';

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
	signedUser: Object ;//= {"successMsg" : "Success","token": "QpwL5tke4Pnpja7X"};


  	constructor(private router: Router, public signupService: SignupService) { }
  	
  	register() : void {
  		let data = {"firstname" : this.firstname, "lastname": this.lastname, "email": this.email ,"password":this.password };
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
