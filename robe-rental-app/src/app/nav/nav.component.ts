import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent implements OnInit {
  background = 'blue';
  canDisplayRoute = false;
  constructor(private router: Router) { 
	  	
  }

  ngOnInit() {
  }

}
