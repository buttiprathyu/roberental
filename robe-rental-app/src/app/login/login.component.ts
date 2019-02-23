import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email: string;
	password: string;
	userRegistered: boolean = true;
	showError: boolean = false;
	errorText: string;
	loggedUser: Object ; // = { "successMsg" : "Success","token": "QpwL5tke4Pnpja7X"};


  	constructor(private router: Router, public loginService: LoginService) { }
  	
  	login() : void {
  		this.userRegistered = true;
  		let data = {"email": this.email ,"password": this.password};
  		this.loginService.postLoginDetails(data).subscribe(data => {
		        this.loggedUser = data;
		        if(this.loggedUser.successMsg && this.loggedUser.token){
			     	this.router.navigate(["myaccount"]);
			    } else {
			      	this.showError = true;
			      	this.errorText = "Invalid Credentials. Please check your email/password.";
			    }
	    	});
	}

	register() : void {
	    this.userRegistered = false;
	}

	logout(): void {
   		//this.token = null;
    	//localStorage.removeItem('currentUser');
  	}

	ngOnInit() {
	}

}