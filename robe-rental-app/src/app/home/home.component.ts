import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { CartService } from '../cart/cart.service';


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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  robeList : myRobe;
  s : string;
  m: string;
  l : string;
  xl : string;
  xxl : string;
  xxxl :  string;
  low : string;
  high : string;
  value:string;
  sizeList : string;
  options : [];
  sizeOptions = [
    {name:'S', value:'S', checked:false},
    {name:'M', value:'M', checked:false},
    {name:'L', value:'L', checked:false},
    {name:'XL', value:'XL', checked:false},
    {name:'XXL', value:'XXL', checked:false},
    {name:'XXXL', value:'XXXL', checked:false}
  ];

  constructor(public homeService: HomeService, public cartService : CartService) {

  }
   getDetails() : void{
      this.homeService.getRobeDetails().then(data => {
            if(data){
              this.robeList = data;
            } else {
                //this.showError = true;
                //this.errorText = "Could not fetch the garments. Please try again.";
            }
        });
    }

  selectPrice = function(value){
    this.homeService.getRobeDetailsByPrice(value).then(data => {
            if(data){
              this.robeList = data;
            } else {
                //this.showError = true;
                //this.errorText = "Could not fetch the garments. Please try again.";
            }
        });
  }

  selectSize = function(value){
    this.Options = this.sizeOptions
              .filter(opt => opt.checked)
              .map(opt => opt.value);
    this.homeService.getRobeDetailsBySize(this.Options).then(data => {
            if(data){
              this.robeList = data;
            } else {
                //this.showError = true;
                //this.errorText = "Could not fetch the garments. Please try again.";
            }
        });
  }

  addtocart = function(myRobe){
    this.cartService.setRobeList(myRobe);
  }

  ngOnInit() { this.getDetails();}

  //ngOnInit() {}

}

