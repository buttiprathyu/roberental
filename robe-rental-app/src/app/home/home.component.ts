import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

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

  /*robeList =  [
    {
      "robeID": "1",
      "robeTitle": "A natural view",
      "robeImg": "assets/paris.jpg",
      "rentPrice": "100",
      "buyPrice": "200",
      "robeSize": "M",
      "robeMaterialDesc" : "This robe has a round neck, long sleeves",
      "robeMaterial" :  "Cotton",
      "robeCare" : "Machine-wash"

    },
    {
      "robeID": "2",
     "robeTitle": "Newspaper",
      "robeImg": "assets/paris.jpg",
      "rentPrice": "100",
      "buyPrice": "200",
      "robeSize": "M",
      "robeMaterialDesc" : "This robe has a round neck, long sleeves",
      "robeMaterial" :  "Cotton",
      "robeCare" : "Machine-wash"
    }
   ]*/


  constructor(public homeService: HomeService) {}
      
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

  ngOnInit() { //this.getDetails();
  }

}
