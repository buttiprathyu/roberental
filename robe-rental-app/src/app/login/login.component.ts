import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './login.service';

export interface myServerMsg{
	successMsg : string,
	token : string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	email: string;
	password: string;
	showError: boolean = false;
	errorText: string;
  	loggedUser : myServerMsg;

  	constructor(private router: Router, public loginService: LoginService) { }

  	login() : void {
  		let data = {"email": this.email ,"password": this.password};
  		localStorage.setItem('email', this.email);
  		this.loginService.postLoginDetails(data).subscribe(data => {
		        this.loggedUser = data;
		        if(this.loggedUser.successMsg && this.loggedUser.token){
			     	this.router.navigate(['']);
			    } else {
			      	this.showError = true;
			      	this.errorText = "Invalid Credentials. Please check your email/password.";
			    }
	    	});
	}

	register() : void {
	    this.router.navigate(["signup"]);
	}

	logout(): void {
   		//this.token = null;
    	//localStorage.removeItem('currentUser');
  	}

	ngOnInit() {
	}

}
