import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //uncomment the below lines - start
  /*type myRobe = {
    robeID : number,
    robeTitle : string,
    robeImg : string,
    rentPrice : number,
    buyPrice : number
  }; 

  robeList : myRobe[];*/ // till here - end

  // Comment or delete this robeList array
	robeList = [
    {
      robeID: 1,
      robeTitle: 'A natural view',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 2,
      robeTitle: 'Newspaper',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 3,
      robeTitle: 'Favourite pizza',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 4,
      robeTitle: 'Abstract design',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 5,
      robeTitle: 'Tech',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 6,
      robeTitle: 'Nightlife',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 7,
      robeTitle: 'A natural view',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 8,
      robeTitle: 'Newspaper',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    },
    {
      robeID: 9,
      robeTitle: 'Favourite pizza',
      robeImg: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg',
      rentPrice: 100,
      buyPrice: 200
    }
  ]; // till here

  constructor(public homeService: HomeService) { }
  
  //uncomment these lines to get your backend code working
  /* this.homeService.getRobeDetails().subscribe(data => {
            this.robeList = data;
          } else {
              this.showError = true;
              this.errorText = "Invalid Credentials. Please check your email/password.";
          }
      }); */ //end
  

  ngOnInit() {
  }

}
