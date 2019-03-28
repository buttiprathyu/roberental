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

<<<<<<< Updated upstream

  robeList : myRobe; 

  /*robeList =  [
=======
  robeList : myRobe;
/*
  robeList =  [
>>>>>>> Stashed changes
    {
      "email": "1@1.com",
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
      "email": "1@1.com",
      "robeTitle": "Newspaper",
      "robeImg": "assets/paris.jpg",
      "rentPrice": "100",
      "buyPrice": "200",
      "robeSize": "M",
      "robeMaterialDesc" : "This robe has a round neck, long sleeves",
      "robeMaterial" :  "Cotton",
      "robeCare" : "Machine-wash"
    },
    {
      "email": "1@1.com",
      "robeTitle": "Newspaper",
      "robeImg": "assets/3e3240383b126b0d777ca7c66fc1a0a8",
      "rentPrice": "100",
      "buyPrice": "200",
      "robeSize": "M",
      "robeMaterialDesc" : "This robe has a round neck, long sleeves",
      "robeMaterial" :  "Cotton",
      "robeCare" : "Machine-wash"
    }
   ]

*/
  constructor(public homeService: HomeService) {}
<<<<<<< Updated upstream
      
=======

>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
  
 
  ngOnInit() { this.getDetails();
  }
=======
  ngOnInit() { this.getDetails();}

  //ngOnInit() {}
>>>>>>> Stashed changes

}

