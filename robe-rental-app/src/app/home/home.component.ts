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

export interface myParams {
  price : string ;
  size : any[];
}

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
  selectedPrice:string = 'none';
  selectedSize : any[];
  paramList : myParams;
  
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
    this.selectedPrice = value;
    this.paramList = {};
    this.paramList.price = this.selectedPrice;
    this.paramList.size = (this.selectedSize)?this.selectedSize:[];
    this.homeService.getRobeDetailsByOrder(this.paramList).then(data => {
            if(data){
              this.robeList = data;
            } else {
                //this.showError = true;
                //this.errorText = "Could not fetch the garments. Please try again.";
            }
        });
  }

  selectSize = function(value){
    this.options = this.sizeOptions
              .filter(opt => opt.checked)
              .map(opt => opt.value);
    this.selectedSize = [this.options];
    this.paramList = {};
    
    this.paramList.price = this.selectedPrice;
    this.paramList.size = [this.options];
    this.homeService.getRobeDetailsByOrder(this.paramList).then(data => {
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

