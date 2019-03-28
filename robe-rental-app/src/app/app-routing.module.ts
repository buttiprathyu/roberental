import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';  
import { SignupComponent } from './signup/signup.component';     


const routes: Routes = [
	{ path: '', component: HomeComponent },
  	{ path: 'about', component: AboutComponent },
  	{ path: 'team', component: TeamComponent },
  	{ path: 'cart', component: CartComponent },
  	{ path: 'login', component: LoginComponent },
  	{ path: 'myaccount', component: MyaccountComponent },
  	{ path: 'signup' , component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
