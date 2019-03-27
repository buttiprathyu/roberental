import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

export interface myRobe{
  robeID? : number,
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

  robeList : myRobe[]; 

  

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

  ngOnInit() { this.getDetails();
  }

}
