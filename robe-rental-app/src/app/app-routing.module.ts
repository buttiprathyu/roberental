import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
  	{ path: 'about', component: AboutComponent },
  	{ path: 'team', component: TeamComponent },
  	{ path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
